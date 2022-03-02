import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ResponseDto } from '../shared/models/api-response.model';
import { ContactUsDto } from '../shared/models/contact-us.model';
import { DialogService } from '../shared/services/dialog.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {


  // #region declare variables

  contactUsForm!: FormGroup;
  isSubmitted!: boolean;
  contactUsDetails!: ContactUsDto;
  listOfReasons!: any

  // #endregion

  // #region constructor
  constructor(
    private formBuilder: FormBuilder,
    public translate: TranslateService,
    private dialogService: DialogService,
    private userService: UserService,
    private router: Router
  ) { 
      // init variables
      this.contactUsDetails = new ContactUsDto
      // init forms
      this.initForms();

      this.listOfReasons = [
        {
          reason: '',
          reason_ar: '',
          reason_en: ''
        },
        {
          reason: '',
          reason_ar: '',
          reason_en: ''
        },
        {
          reason: '',
          reason_ar: 'أخرى',
          reason_en: 'other'
        }
      ]
  }
  // #endregion


  // #region ngOnInit  
  ngOnInit(): void {
  }
  // #endregion

  // #region init forms

  initForms() {
    this.initContactUsForm();
  }

  initContactUsForm() {
    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      reason: ['', Validators.required],
      message_text_area: ['',  Validators.required],
    });
  }

  // form controls
  get contsctUsFormControls() {
    return this.contactUsForm.controls;
  }

  // #endregion


  // #region main actions
  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  sendMessage() {
    this.isSubmitted = true;

    if(this.contactUsForm.valid) {
        this.userService.contactUs(this.contactUsDetails).subscribe((response: ResponseDto) => {
          this.router.navigate(['/'])
          this.dialogService.savedSuccessfully('Thank you for contacting us. A mail was sent to our team, we are looking into your mail right now.')
        })
    }
  }

  // #endregion

}
