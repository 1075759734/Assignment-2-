import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { first } from 'rxjs/operators';
import { Channel } from '../models/channel';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
  channels: Channel[];

  constructor(
    private channelService: ChannelService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.loadAllChannels();
  }

  private loadAllChannels() {
    this.channelService.getAll().pipe(first()).subscribe(channels => {
      this.channels = channels;
    });
  }

  gotoChatRoom(channelname: string) {
    this.router.navigate([`../Chat/${channelname}`], { relativeTo: this.activatedRoute });
  }

}
