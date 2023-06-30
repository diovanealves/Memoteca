import { Component } from '@angular/core';
import { Thought } from '../thought';
import { ThoughtService } from '../thought.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exclude-thought',
  templateUrl: './exclude-thought.component.html',
  styleUrls: ['./exclude-thought.component.css']
})
export class ExcludeThoughtComponent {
  thought: Thought = {
    id: 0,
    content: "",
    authorship: "",
    model: "",
    favorite: false,
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

  excludeThought(){
    if(this.thought.id) {
      this.service.exclude(this.thought.id).subscribe(() => {
        this.router.navigate(["/"])
      })
    }
  }

  cancel(){
    this.router.navigate(["/"])
  }
}
