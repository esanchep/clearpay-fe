import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Literal } from 'src/assets/i18n/literals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    titleService: Title,
    translateService: TranslateService
  ) {
    this.setAppTitle(titleService, translateService);
  }

  private setAppTitle(titleService: Title, translateService: TranslateService): void {
    translateService.setDefaultLang('en');
    translateService.get('page_title').subscribe((res: string) => {
      titleService.setTitle(translateService.instant(Literal.app.title));
    });
  }

  ngOnInit(): void {
  }

}
