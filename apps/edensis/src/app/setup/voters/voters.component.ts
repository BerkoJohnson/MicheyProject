import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectionService } from '../../services';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {
  imageUrl: any;
  imageError: string;
  constructor(
    private router: Router,
    private electionService: ElectionService
  ) {}

  ngOnInit(): void {
    this.electionService.election$.subscribe(e => {
      if (e === null) {
        this.router.navigate(['elections'], {
          queryParams: { returnUrl: 'voters' }
        });
      }
    });
  }

  previewImage(event: Event) {
    const file = event.target['files'][0] as File;
    if (!file) return;

    // Validate file input
    const mimetype = file.type;
    if (mimetype.match(/image\/*/) === null) {
      this.imageError = 'Only images are supported!';
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.imageUrl = reader.result;
    };
  }
}
