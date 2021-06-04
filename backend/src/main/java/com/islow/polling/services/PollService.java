package com.islow.polling.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.islow.polling.dto.ChoiceDto;
import com.islow.polling.dto.PollChoiceDto;
import com.islow.polling.dto.PollDto;
import com.islow.polling.exceptions.ValidationException;
import com.islow.polling.models.Choice;
import com.islow.polling.models.Poll;
import com.islow.polling.models.User;
import com.islow.polling.repository.ChoiceRepository;
import com.islow.polling.repository.PollRepository;

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
}