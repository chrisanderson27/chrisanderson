import { Component, OnInit } from '@angular/core';
import { transition, trigger, query, style, stagger, animate, keyframes } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { TrainComponent } from './projects/train/train.component';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { code } from 'src/app/Models/SourceCode.model';


@Component({
  selector: 'app-full-stack-projects',
  templateUrl: './full-stack-projects.component.html',
  styleUrls: ['./full-stack-projects.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*<=>*', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(100, [
            animate('500ms 400ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' }))
          ])
        ], { optional: true })
      ])
    ]),
  ]
})
export class FullStackProjectsComponent implements OnInit {

  projects;
  sourceCode;
  constructor(private dialog: MatDialog, private service: SourceCodeService) {
    this.service.currentProjectView.subscribe(projects => this.projects = projects);
  }

  ngOnInit() {

  }

  openDialog(componentName: string) {
    const styles = {
      maxWidth: '95vw',
      maxHeight: '95vh',
    };

    let dialogRef = null;
    switch (componentName) {
      case 'health':
        this.sourceCode = [

          ['PatientController.java', code.backEndProjects.SpringMVCHealthCare.patientController],
          ['DrugDAOimpl.java', code.backEndProjects.SpringMVCHealthCare.DrugDAOimpl],
          ['Drug/PatientDAO.java', code.backEndProjects.SpringMVCHealthCare.DrugPatientDAOs],
          ['DrugPatientServiceImpl.java', code.backEndProjects.SpringMVCHealthCare.DrugPatientServiceImpl],
          ['PatientDAOImpl.java', code.backEndProjects.SpringMVCHealthCare.PatientDAOImpl],
          ['DrugController.java', code.backEndProjects.SpringMVCHealthCare.drugController],
          ['PatientModel.java', code.backEndProjects.SpringMVCHealthCare.PatientModel],
          ['DrugModel.java', code.backEndProjects.SpringMVCHealthCare.drugModel],

        ];
        this.service.currentSourceCode = this.sourceCode;
        break;
      case 'account':
        this.sourceCode = [

          ['JDBCTemplate.java', code.backEndProjects.accountHolderJDBC.JDBCTemplate],
          ['Main.java', code.backEndProjects.accountHolderJDBC.main],
          ['AccountMapper.java', code.backEndProjects.accountHolderJDBC.AccountMapper],

        ];
        this.service.currentSourceCode = this.sourceCode;
        break;
      case 'hibernateMapping':
        this.sourceCode = [

          ['Customer.java', code.backEndProjects.hibernateMapping.customer],
          ['Employee.java', code.backEndProjects.hibernateMapping.employee],
          ['Loan.java', code.backEndProjects.hibernateMapping.loan],
          ['Main.java', code.backEndProjects.hibernateMapping.main],
          ['Report.java', code.backEndProjects.hibernateMapping.report],
          ['User.java', code.backEndProjects.hibernateMapping.user],
          ['config.hibernate.xml', code.backEndProjects.hibernateMapping.config],

        ];
        this.service.currentSourceCode = this.sourceCode;
        break;
      case 'mortgageJDBC':
        this.sourceCode = [

          ['Controller.java', code.backEndProjects.mortgageJDBC.Controller],
          ['CustomerDAO.java', code.backEndProjects.mortgageJDBC.CustomerDAO],
          ['EmployeeDAO.java', code.backEndProjects.mortgageJDBC.EmployeeDAO],
          ['LoanDAO.java', code.backEndProjects.mortgageJDBC.LoanDAO],
          ['ReportDAO.java', code.backEndProjects.mortgageJDBC.ReportDAO],
          ['UserDAO.java', code.backEndProjects.mortgageJDBC.UserDAO]

        ];
        this.service.currentSourceCode = this.sourceCode;
        break;
      case 'train':
        this.sourceCode = [

          ['Passenger.java', code.backEndProjects.train.passenger],
          ['Ticket.java', code.backEndProjects.train.ticket],
          ['TicketServlet.java', code.backEndProjects.train.ticketServlet],
          ['Train.java', code.backEndProjects.train.train],
          ['TrainDAO.java', code.backEndProjects.train.trainDAO],

        ];
        this.service.currentSourceCode = this.sourceCode;
        break;

      default:
        break;
    }

    dialogRef = this.dialog.open(SourceCodeViewComponent, styles);


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
