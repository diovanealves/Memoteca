import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { ThoughtService } from '../thought.service';
import { Thought } from './../thought';

@Component({
  selector: 'app-edit-thought',
  templateUrl: './edit-thought.component.html',
  styleUrls: ['./edit-thought.component.css']
})
export class EditThoughtComponent {
  form!: FormGroup;

  constructor(
    private service: ThoughtService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    this.service.findById(parseInt(id!)).subscribe((thought) => {
      this.form = this.formBuilder.group({
        id: [thought.id],
        content: [thought.content, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        authorship: [thought.authorship, Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])],
        model: [thought.model],
        favorite: [thought.favorite]
      })
    })
  }

  editThought(){
    this.service.edit(this.form.value).subscribe(() => {
      return this.router.navigate(["/"])
    })
  }

  cancelThought(){
    return this.router.navigate(["/"])
  }

  enableButton(): string {
    if(this.form.valid) {
      return "button"
    } else {
      return "buttonDisabled"
    }
  }
}
