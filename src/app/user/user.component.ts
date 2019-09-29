import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Group } from '../models/group';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username = '';

  mode = 'edit';
  isView = false;
  isNew = false;
  isEdit = false;

  userForm: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;

  currentUser: User;
  currentUserSubscription: Subscription;

  buttonText = '';

  // @ts-ignore
  groupList: Group[] = [
    { groupName: 'group1', description: 'group 1' },
    { groupName: 'group2', description: 'group 2' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) {
    console.log(this.router.getCurrentNavigation().extras.state.mode);
    const { mode, username } = this.router.getCurrentNavigation().extras.state;
    this.mode = mode;
    this.username = username;

    if (this.mode === 'view') {
      this.isView = true;
      this.buttonText = 'Back';
    }

    if (this.mode === 'edit') {
      this.isEdit = true;
      this.buttonText = 'Save';
    }

    if (this.mode === 'new') {
      this.isNew = true;
      this.buttonText = 'Save';
    }

    if (!this.isView && !this.isEdit && !this.isNew) {
      this.router.navigate(['/Home']);
    }

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    // this.userForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });

    if (this.username && (this.isView || this.isEdit)) {
      this.userService.getByUsername(this.username)
        .subscribe((user: User) => {
          this.initForm(user);
        });

    } else {
      this.initForm();
    }




  }

  initForm(user?: User) {
    const formData = {
      username: '',
      password: '',
      ofSuperAdminInRole: false,
      ofGroupAdminInRole: false,
      ofGroupAssistInRole: false,
      groupList: [],
      channelList: [],
      adminGroupList: [],
    };

    if ((this.isEdit || this.isView) && user) {
      formData.username = user.username;
      formData.password = user.password;
      formData.ofSuperAdminInRole = user.ofSuperAdminInRole;
      formData.ofGroupAdminInRole = user.ofGroupAdminInRole;
      formData.ofGroupAssistInRole = user.ofGroupAssistInRole;
      formData.groupList = user.groupList;
      formData.channelList = user.channelList;
      formData.adminGroupList = user.adminGroupList;
    }

    const formControls = {
      username: new FormControl({
        value: formData.username,
        disabled: this.isEdit || this.isView},
        Validators.required),
      // username: new FormControl(formData.username),
      password: new FormControl({ value: formData.password,
        disabled: this.isView },
        Validators.required),
      ofSuperAdminInRole: new FormControl({
        value: formData.ofSuperAdminInRole,
        disabled: this.isView }),
      ofGroupAdminInRole: new FormControl({ value: formData.ofGroupAdminInRole,
        disabled: this.isView }),
      ofGroupAssistInRole: new FormControl({ value: formData.ofGroupAssistInRole,
        disabled: this.isView }),
      groupList: new FormControl({ value: formData.groupList,
        disabled: this.isView }),
      channelList: new FormControl({ value: formData.channelList,
        disabled: this.isView }),
      adminGroupList: new FormControl({ value: formData.adminGroupList,
        disabled: this.isView }),
    };

    this.userForm = new FormGroup(formControls);
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.mode === 'view') {
      this.router.navigate(['/Home']);
    }

    if (this.mode === 'edit') {
      this.userService.update(this.userForm.getRawValue())
        .subscribe(res => {
          console.log(`user updated.`);
          this.router.navigate(['/Home']);
        });
    }

    if (this.mode === 'new') {
      this.userService.create(this.userForm.value)
        .subscribe(res => {
          console.log(`user created.`);
          this.router.navigate(['/Home']);
        });
    }

    // this.userService.login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.router.navigate([this.returnUrl]);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //     });
  }

}
