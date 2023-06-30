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
  thought: Thought = {
    id: 0,
    content: "",
    authorship: "",
    model: "",
  }

  constructor(
    private service: ThoughtService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id")
    this.service.findById(parseInt(id!)).subscribe((thought) => {
      this.thought = thought
    })
  }

  editThought(){
    this.service.edit(this.thought).subscribe(() => {
      return this.router.navigate(["/"])
    })
  }

  cancelThought(){
    return this.router.navigate(["/"])
  }
}
