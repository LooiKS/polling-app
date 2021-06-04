package com.islow.polling.services;

import com.islow.polling.dto.ChoiceDto;
import com.islow.polling.dto.PollChoiceDto;
import com.islow.polling.dto.PollDto;
import com.islow.polling.models.Choice;
import com.islow.polling.models.Poll;
import com.islow.polling.models.User;
import com.islow.polling.repository.ChoiceRepository;
import com.islow.polling.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private ChoiceRepository choiceRepository;

    public PollChoiceDto addPoll(PollChoiceDto pollChoiceDto, User user) {

        // save poll
        PollDto pollDto = pollChoiceDto.getPoll();
        Poll poll = new Poll(pollDto.getQuestion(), user, pollDto.getExpiryDt());
        poll = pollRepository.save(poll);

        // save choices
        List<ChoiceDto> choices = pollChoiceDto.getChoices();
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

    public PollChoiceDto findAllPollsWithoutLogin() {
        Iterable<Poll> polls = pollRepository.findAll();
        List<Poll> pollList =
                StreamSupport.stream(polls.spliterator(), false)
                        .collect(Collectors.toList());




        return null;

    }

    public PollChoiceDto findPolls(String username) {
        List<Poll> polls = pollRepository.findPolls(username);

        List<Long> pollsIds = polls.stream().map(Poll::getId).collect(Collectors.toList());

        List<Choice> choices = choiceRepository.findByPollIds(pollsIds);


//        List<Choice> choices =
//
//
//        PollChoiceDto pollChoiceDto = new PollChoiceDto(polls)

        return null;
    }
}
