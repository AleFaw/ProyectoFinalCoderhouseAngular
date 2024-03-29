import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import {MatTableModule} from '@angular/material/table';
import { SubjectsService } from './subjects.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../../shared/shared.module';
import { InscriptionsService } from '../inscriptions/inscriptions.service';
import { InscriptionsModule } from '../inscriptions/inscriptions.module';
import { EffectsModule } from '@ngrx/effects';
import { SubjectsEffects } from './store/subjects.effects';
import { StoreModule } from '@ngrx/store';
import { subjectsFeature } from './store/subjects.reducer';


@NgModule({
  declarations: [
    SubjectsComponent,
    SubjectFormComponent
  ],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    SharedModule,
    InscriptionsModule,
    StoreModule.forFeature(subjectsFeature),
    EffectsModule.forFeature([SubjectsEffects]),
  ],
  providers: [
    SubjectsService,
    InscriptionsService,
  ],
})
export class SubjectsModule { }
