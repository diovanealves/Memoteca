import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';

@Component({
  selector: 'app-create-thought',
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.css']
})
export class CreateThoughtComponent {
  form!: FormGroup;

  constructor(
    private service: ThoughtService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      content: ["", Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      authorship: ["", Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      model: ["model1"],
      favorite: [false]
    })
  }

  createThought() {
    if(this.form.valid){
      this.service.create(this.form.value).subscribe(() => {
        this.router.navigate(["/"])
      })
    } else {
      return alert("Erro ao criar Pensamento")
    }
  }

  cancelThought(){
    this.router.navigate(["/"])
  }

  enableButton(): string {
    if(this.form.valid) {
      return "button"
    } else {
      return "buttonDisabled"
    }
  }

}
