package com.islow.polling.services;

import com.islow.polling.PollingApplication;
import com.islow.polling.dto.ChoiceDto;
import com.islow.polling.dto.PollChoiceDto;
import com.islow.polling.dto.PollChoiceVoteDto;
import com.islow.polling.dto.PollDto;
import com.islow.polling.dto.VoteDto;
import com.islow.polling.exceptions.ValidationException;
import com.islow.polling.models.Choice;
import com.islow.polling.models.Poll;
import com.islow.polling.models.User;
import com.islow.polling.models.Vote;
import com.islow.polling.repository.ChoiceRepository;
import com.islow.polling.repository.PollRepository;
import com.islow.polling.repository.VoteRepository;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.lang.Long.parseLong;

@Service
public class PollService {

    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private ChoiceRepository choiceRepository;

    @Autowired
    private VoteRepository voteRepository;

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
    public VoteDto addVote(VoteDto voteDto, User user)  throws ValidationException {
     

    	if (voteDto.getChoiceID() == null) {
            throw new ValidationException("Choice is not found.");
    	}else if (voteDto.getPollID() ==null ) {
            throw new ValidationException("Poll is not found.");
    	}
    	else {
    		Optional<Poll> poll = pollRepository.findById(voteDto.getPollID());
    		Optional<Choice> choice = choiceRepository.findById(voteDto.getChoiceID());
    		if (poll.isPresent() && choice.isPresent()) {
    		Vote vote = new Vote (poll.get(),choice.get(),user);
    		vote = voteRepository.save(vote);
    		}
    		return voteDto;
    	}
    }

    public List<PollChoiceVoteDto> findAllPollsWithoutLogin() {
        Iterable<Poll> polls = pollRepository.findAll();

        List<Poll> pollsList =
                StreamSupport.stream(polls.spliterator(), false)
                        .collect(Collectors.toList());

        Iterable<Choice> choices = choiceRepository.findAll();

        List<Choice> choiceList =
                StreamSupport.stream(choices.spliterator(), false)
                        .collect(Collectors.toList());
        
        Iterable<Vote> votes = voteRepository.findAll();

        List<Vote> voteList =
                StreamSupport.stream(votes.spliterator(), false)
                        .collect(Collectors.toList());


        List<PollChoiceVoteDto> pollChoiceVoteDto = new ArrayList<>();
        if (!pollsList.isEmpty() && !choiceList.isEmpty()) {
            pollChoiceVoteDto = pollChoiceVoteMapping(pollsList, choiceList,voteList);
        }
        return pollChoiceVoteDto;

    }

    public List<PollChoiceVoteDto> findPolls(User user) {
        List<Poll> polls = pollRepository.findAllByCreatedBy(user);

        Iterable<Choice> choices = choiceRepository.findAll();
        List<Choice> choiceList =
                StreamSupport.stream(choices.spliterator(), false)
                        .collect(Collectors.toList());
        List<PollChoiceVoteDto> pollChoiceVoteDto = new ArrayList<>();

        Iterable<Vote> votes = voteRepository.findAll();

        List<Vote> voteList =
                StreamSupport.stream(votes.spliterator(), false)
                        .collect(Collectors.toList());

        if (polls!=null && !choiceList.isEmpty()) {
        	pollChoiceVoteDto = pollChoiceVoteMapping(polls, choiceList,voteList);
        }

        return pollChoiceVoteDto;
    }

    public PollChoiceVoteDto findParticularPoll(String username, String pollId) {
        Poll poll = pollRepository.findPollById(parseLong(pollId));

        Iterable<Choice> choices = choiceRepository.findAll();
        List<Choice> choiceList =
                StreamSupport.stream(choices.spliterator(), false)
                        .collect(Collectors.toList());
        Iterable<Vote> votes = voteRepository.findAll();

        List<Vote> voteList =
                StreamSupport.stream(votes.spliterator(), false)
                        .collect(Collectors.toList());


        PollChoiceVoteDto pollChoiceVoteDto = new PollChoiceVoteDto();


        if (poll != null && !choiceList.isEmpty()) {
            List<Choice> choicesList = choiceList.stream().filter(choice -> choice.getPoll().getId().equals(parseLong(pollId))).collect(Collectors.toList());
            List<ChoiceDto> choiceDtoList = new ArrayList<>();
            choicesList.forEach(choice -> {
                ChoiceDto choiceDto = new ChoiceDto(choice);
                choiceDtoList.add(choiceDto);
            });

            List<Vote> votesList = voteList.stream().filter(vote -> vote.getPollID().getId().equals(parseLong(pollId))).collect(Collectors.toList());
            List<VoteDto> voteDtoList = new ArrayList<>();
            votesList.forEach(vote -> {
            	VoteDto voteDto = new VoteDto(vote);
                voteDtoList.add(voteDto);
            });

            PollDto pollDto = new PollDto(poll);
            pollChoiceVoteDto = new PollChoiceVoteDto(pollDto, choiceDtoList,voteDtoList);
        }

        return pollChoiceVoteDto;
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
    
    private List<PollChoiceVoteDto> pollChoiceVoteMapping(List<Poll> polls, List<Choice> choiceList, List<Vote> voteList) {
        List<PollChoiceVoteDto> pollChoiceVoteDto = new ArrayList<>();
        polls.forEach(poll -> {
            List<Choice> choicesList = choiceList.stream().filter(choice -> choice.getPoll().getId().equals(poll.getId())).collect(Collectors.toList());
            List<Vote> votesList = voteList.stream().filter(vote -> vote.getPollID().getId().equals(poll.getId())).collect(Collectors.toList());

            PollDto pollDto = new PollDto(poll);

            List<ChoiceDto> choiceDtoList = new ArrayList<>();
            choicesList.forEach(choice -> {
                ChoiceDto choiceDto = new ChoiceDto(choice);
                choiceDtoList.add(choiceDto);
            });
            
            List<VoteDto> voteDtoList = new ArrayList<>();
            votesList.forEach(vote -> {
                VoteDto voteDto = new VoteDto(vote);
                voteDtoList.add(voteDto);
            });
            
            
            
            pollChoiceVoteDto.add(new PollChoiceVoteDto(pollDto, choiceDtoList,voteDtoList));
        });

        return pollChoiceVoteDto;
    }
}
