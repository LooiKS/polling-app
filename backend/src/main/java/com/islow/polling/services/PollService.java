package com.islow.polling.services;

import com.islow.polling.dto.ChoiceDto;
import com.islow.polling.dto.PollChoiceDto;
import com.islow.polling.dto.PollDto;
import com.islow.polling.exceptions.ValidationException;
import com.islow.polling.models.Choice;
import com.islow.polling.models.Poll;
import com.islow.polling.models.User;
import com.islow.polling.repository.ChoiceRepository;
import com.islow.polling.repository.PollRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.lang.Long.parseLong;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private ChoiceRepository choiceRepository;

    public PollChoiceDto addPoll(PollChoiceDto pollChoiceDto, User user) throws ValidationException {

        // save poll
        PollDto pollDto = pollChoiceDto.getPoll();
        List<ChoiceDto> choices = pollChoiceDto.getChoices();

        if (pollDto.getExpiryDt() == null) {
            throw new ValidationException("Expiry date is required.");
        } else if (StringUtils.isEmpty(pollDto.getQuestion())) {
            throw new ValidationException("Poll question is required.");
        } else if (choices.size() < 2 || choices.size() > 6) {
            throw new ValidationException("Choices length must be between 2 - 6 (inclusive).");
        } else if (new Date().after(pollDto.getExpiryDt())) {
            throw new ValidationException("Expiry date must be after current date and time.");
        } else {

            Poll poll = new Poll(pollDto.getQuestion(), user, pollDto.getExpiryDt());
            poll = pollRepository.save(poll);

            // save choices
            List<ChoiceDto> choiceDtos = new ArrayList<ChoiceDto>();

            for (ChoiceDto choiceDto : choices) {
                Choice choice = new Choice();
                choice.setAnswer(choiceDto.getAnswer());
                choice.setPoll(poll);
                choiceDtos.add(new ChoiceDto(choiceRepository.save(choice)));
            }

            PollChoiceDto pollChoiceDtoSaved = new PollChoiceDto(new PollDto(poll), choiceDtos);
            return pollChoiceDtoSaved;
        }
    }

    public List<PollChoiceDto> findAllPollsWithoutLogin() {
        Iterable<Poll> polls = pollRepository.findAll();

        List<Poll> pollsList =
                StreamSupport.stream(polls.spliterator(), false)
                        .collect(Collectors.toList());

        Iterable<Choice> choices = choiceRepository.findAll();

        List<Choice> choiceList =
                StreamSupport.stream(choices.spliterator(), false)
                        .collect(Collectors.toList());


        List<PollChoiceDto> pollChoiceDto = new ArrayList<>();
        if (!pollsList.isEmpty() && !choiceList.isEmpty()) {
            pollChoiceDto = pollChoiceMapping(pollsList, choiceList);
        }
        return pollChoiceDto;

    }

    public List<PollChoiceDto> findPolls(String username) {
        List<Poll> polls = pollRepository.findPolls(username);

        Iterable<Choice> choices = choiceRepository.findAll();
        List<Choice> choiceList =
                StreamSupport.stream(choices.spliterator(), false)
                        .collect(Collectors.toList());
        List<PollChoiceDto> pollChoiceDto = new ArrayList<>();
        if (!polls.isEmpty() && !choiceList.isEmpty()) {
            pollChoiceDto = pollChoiceMapping(polls, choiceList);
        }

        return pollChoiceDto;
    }

    public PollChoiceDto findParticularPoll(String username, String pollId) {
        Poll poll = pollRepository.findPollByPollId(pollId);

        Iterable<Choice> choices = choiceRepository.findAll();
        List<Choice> choiceList =
                StreamSupport.stream(choices.spliterator(), false)
                        .collect(Collectors.toList());

        PollChoiceDto pollChoiceDto = new PollChoiceDto();


        if (poll != null && !choiceList.isEmpty()) {
            List<Choice> choicesList = choiceList.stream().filter(choice -> choice.getPoll().getId().equals(parseLong(pollId))).collect(Collectors.toList());
            List<ChoiceDto> choiceDtoList = new ArrayList<>();
            choicesList.forEach(choice -> {
                ChoiceDto choiceDto = new ChoiceDto(choice);
                choiceDtoList.add(choiceDto);
            });
            PollDto pollDto = new PollDto(poll);
            pollChoiceDto = new PollChoiceDto(pollDto, choiceDtoList);
        }

        return pollChoiceDto;
    }

    private List<PollChoiceDto> pollChoiceMapping(List<Poll> polls, List<Choice> choiceList) {
        List<PollChoiceDto> pollChoiceDto = new ArrayList<>();
        polls.forEach(poll -> {
            List<Choice> choicesList = choiceList.stream().filter(choice -> choice.getPoll().getId().equals(poll.getId())).collect(Collectors.toList());

            PollDto pollDto = new PollDto(poll);

            List<ChoiceDto> choiceDtoList = new ArrayList<>();
            choicesList.forEach(choice -> {
                ChoiceDto choiceDto = new ChoiceDto(choice);
                choiceDtoList.add(choiceDto);
            });

            pollChoiceDto.add(new PollChoiceDto(pollDto, choiceDtoList));
        });

        return pollChoiceDto;
    }
}
