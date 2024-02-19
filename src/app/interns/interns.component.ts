
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';

@Component({
  selector: 'app-interns',
  templateUrl: './interns.component.html',
  styleUrls: ['./interns.component.css']
})
export class InternsComponent implements OnInit {
  internArr: any[] = [];
  intern: any = {
    empId: 0,
    name: '',
    email: '',
    department: '',
    joiningDate: ''
  };
  todayDate: string;
  internForm: FormGroup;
  showForm: boolean = false;
  isUpdateMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.internForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      department: ['', Validators.required],
      joiningDate: ['', [Validators.required]]
    });
  this.todayDate = new Date().toISOString().split('T')[0];
  } 
   

  ngOnInit(): void {
    const localData = localStorage.getItem('interns');
    if (localData !== null) {
      this.internArr = JSON.parse(localData);
    }
  }


  addIntern(): void {
    if (this.internForm.valid) {
      if (this.isUpdateMode) {
        const index = this.internArr.findIndex(s => s.empId === this.intern.empId);
        if (index !== -1) {
          this.internArr[index] = { empId: this.intern.empId, ...this.internForm.value }; // Keep the empId the same
          localStorage.setItem('interns', JSON.stringify(this.internArr));
          this.resetIntern();
          this.isUpdateMode = false;
        }
      } else {
        const newIntern = { empId: this.internArr.length + 1, ...this.internForm.value };
        this.internArr.push(newIntern);
        localStorage.setItem('interns', JSON.stringify(this.internArr));
        this.resetIntern();
      }
      this.showForm = false;
    }
  }
  

  onedit(intern: any): void {
    this.intern = intern;
    this.internForm.patchValue(intern);
    this.showForm = true;
    this.isUpdateMode = true;
  }

  deleteIntern(empId: number): void {
    this.internArr = this.internArr.filter(intern => intern.empId !== empId);
    localStorage.setItem('interns', JSON.stringify(this.internArr));
  }

  resetIntern(): void {
    this.intern = { empId: 0, name: '', email: '', department: '', joiningDate: '' };
    this.internForm.reset();
  }

  openModal() {
    this.showForm = true;
  }

  closeModal() {
    this.showForm = false;
  }
  
  

}