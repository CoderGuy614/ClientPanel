import { ClientService } from './../../services/client.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessage.show('Please Fill Out all the form fields', {
        cssClass: 'alert-danger mt-2',
        timeout: 4000,
      });
    } else {
      // Add New Client
      this.clientService.newClient(value);
      // Show Message
      this.flashMessage.show('New Client Added', {
        cssClass: 'alert-success mt-2',
        timeout: 4000,
      });
      // Redirect to Dash
      this.router.navigate(['/']);
    }
  }
}
