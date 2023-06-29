import { Component } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-thought',
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.css']
})
export class CreateThoughtComponent {
  thought: Thought = {
    content: "",
    authorship: "",
    model: "model2"
  }

  constructor(
    private service: ThoughtService,
    private router: Router
    ) {}

  ngOnInit(): void {}

  createThought() {
    alert("Novo pensamento criado");
    this.service.create(this.thought).subscribe(() => {
      this.router.navigate(["/"])
    })
  }

  cancelThought(){
    this.router.navigate(["/"])
  }

}
