import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataServiceService } from '../../app-service/data-service.service';
import { Notification } from '../../app-model/notification';
import { Profile } from '../../app-model/profile';

declare var $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  token: any;
  notifications: Array<Notification> = [];
  productOwner: Profile;

  constructor(private coookieService: CookieService, private dataService: DataServiceService) { }

  ngOnInit() {
    $('#liHome').removeClass('active');
    $('#liProfile').removeClass('active');
    $('#liNotification').addClass('active');
    this.token = this.coookieService.get('jwtToken');
    this.productOwner = new Profile();
    this.getUserNotifications();
    this.markNotificationAsRead();
  }

  getUserNotifications() {
    this.notifications = null;
    this.notifications = new Array<Notification>();
    this.dataService.getNotifications(this.token).subscribe(res => {
      if (res.status == 200) {
        this.notifications = res.json();
      }
    });
  }

  markNotificationAsRead() {
    this.dataService.updateNotifications(this.token).subscribe(res => {
      if (res.status == 200) {
        console.log("Notifications marked as read");
      }
      else if (res.status == 404) {
        console.log("No notifications to update");
      }
    });
  }

  approveRentalRequest(element, selectedItem, text, rental_id) {
    this.dataService.approveRentalRequest(this.token, rental_id).subscribe(res => {
      if (res.status == 204) {
        console.log("Product rental approved");
        selectedItem.rental_status = "APPROVED";
      }
    });
  }

  denyRentalRequest(element, selectedItem, text, rental_id) {
    this.dataService.denyRentalRequest(this.token, rental_id).subscribe(res => {
      if (res.status == 204) {
        console.log("Product rental denied");
        selectedItem.rental_status = "DENIED";
      }
    });
  }

  showProductOwnerInfo(product_id) {
    this.dataService.getUserInfoOnProductId(this.token, product_id).subscribe(res => {
      if (res.status == 200) {
        $('#btnShowOwnerInfoModal').click();
        this.productOwner = null;
        this.productOwner = new Profile();
        this.productOwner = res.json();
      }
    });
  }

}
