import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PollChoiceDto } from 'src/app/modules/shared/model/pollChoiceDto.model';
import { PollService } from 'src/app/modules/shared/service/poll.service';

@Component({
  templateUrl: './create-polling.component.html',
  styleUrls: ['./create-polling.component.scss'],
})
export class CreatePollingComponent implements OnInit {
  validateForm!: FormGroup;
  date: Date;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private pollService: PollService
  ) {}

  ngOnInit(): void {
    console.log(this.validateForm);
    this.validateForm = this.fb.group({
      poll: this.fb.group({
        question: [null, [Validators.required]],
        expiryDt: [null, [Validators.required, this.expiryDtValidator]],
      }),
      choices: this.fb.array([
        this.fb.group({
          answer: [null, [Validators.required]],
        }),
        this.fb.group({
          answer: [null, [Validators.required]],
        }),
      ]),
    });
    console.log(this.validateForm);
  }

  expiryDtValidator(control: FormControl) {
    return control.value != null && new Date().getTime() >= control.value
      ? {
          beforeNow: true,
        }
      : null;
  }

  get choices(): FormArray {
    return this.validateForm.get('choices') as FormArray;
  }

  create() {
    console.log((this.validateForm.get('poll') as FormGroup).controls);
    for (const i in (this.validateForm.get('poll') as FormGroup).controls) {
      (this.validateForm.get('poll') as FormGroup).controls[i].markAsDirty();
      (this.validateForm.get('poll') as FormGroup).controls[
        i
      ].updateValueAndValidity();
    }

    for (const i in this.choices.controls) {
      this.choices.controls[i].get('answer').markAsDirty();
      this.choices.controls[i].get('answer').updateValueAndValidity();
    }

    console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      // POST data
      let pollChoiceDto: PollChoiceDto = this.validateForm.value;

      this.pollService.createPoll(pollChoiceDto).subscribe();
    }
  }

  addChoice() {
    if ((this.validateForm.get('choices') as FormArray).length < 6) {
      (this.validateForm.get('choices') as FormArray).push(
        this.fb.group({ choice: [null, [Validators.required]] })
      );
    } else {
      this.message.warning('Maximum of choices is 6.', {});
    }
  }

  deleteChoice(index: number) {
    console.log(index);
    this.choices.removeAt(index);
  }

  onDateChange(event) {
    console.log(event);
  }
}
