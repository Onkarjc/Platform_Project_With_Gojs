import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ProcessModelComponent } from './process-model/process-model.component';
import { PropertiesPanelComponent } from './properties-panel/properties-panel.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { CastComponent } from './functions/cast/cast.component';
import { DateComponent } from './functions/date/date.component';
import { IfComponent } from './functions/if/if.component';
import { EmailComponent } from './integration/email/email.component';
import { KfkaComponent } from './integration/kfka/kfka.component';
import { MqComponent } from './integration/mq/mq.component';
import { SapComponent } from './integration/sap/sap.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { OrderComponent } from './views/order/order.component';
import { ConfirmationComponent } from './views/confirmation/confirmation.component';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTreeModule} from '@angular/material/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConnectorsComponent } from './connectors/connectors.component';
import { CircleComponent } from './circle/circle.component';
import { RectangleComponent } from './rectangle/rectangle.component'

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    ProcessModelComponent,
    PropertiesPanelComponent,
    SideBarComponent,
    CastComponent,
    DateComponent,
    IfComponent,
    EmailComponent,
    KfkaComponent,
    MqComponent,
    SapComponent,
    CheckoutComponent,
    OrderComponent,
    ConfirmationComponent,
    ConnectorsComponent,
    CircleComponent,
    RectangleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTreeModule,
    BrowserAnimationsModule,
    FormsModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
