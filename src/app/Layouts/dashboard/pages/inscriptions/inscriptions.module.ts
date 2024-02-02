import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import {MatTableModule} from '@angular/material/table';
import { InscriptionsService } from './inscriptions.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptionFormComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    InscriptionsService,
  ],
})
export class InscriptionsModule { }
