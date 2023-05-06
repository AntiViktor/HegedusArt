import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comment } from '../../../../shared/models/Comment';
import { CommentService } from '../../../../shared/services/comment.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/models/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit, OnDestroy {

  comments: Array<Comment> = [];
  user?: User

  commentsLoadingSubscription?: Subscription;
  
  commentsForm = this.createForm({
    id: '',
    username: '',
    product_id: '',
    comment: '',
    date: new Date().getTime()
  });

  constructor(
    private formBuilder: FormBuilder,
    private commentService : CommentService,
    private userService : UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');
    this.commentsForm.get('product_id')?.setValue(productIdFromRoute);

    this.commentsLoadingSubscription = this.commentService.getCommentsByProductId(productIdFromRoute as string)
    .subscribe(comments => {
      this.comments = comments;
      console.log(comments);
    })

    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.commentsForm.get('username')?.setValue(this.user?.username);
    }, error => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
    this.commentsLoadingSubscription?.unsubscribe();
  }

  createForm(model: Comment) {
    let formGroup = this.formBuilder.group(model);
    formGroup.get('username')?.addValidators([Validators.required]);
    formGroup.get('comment')?.addValidators([Validators.required]);
    return formGroup;
  }

  addComment() {
    console.log(this.commentsForm.value);
    if (this.commentsForm.valid) {
      if (this.commentsForm.get('username') && this.commentsForm.get('comment')) {
        // this.commentsForm.get('date')?.setValue(new Date());

        this.commentService.create(this.commentsForm.value).then(_ => {
          console.log('Sikeresen hozzáadtad a kommentet!')
          this.commentsForm.get('comment')?.setValue('');
        }).catch(error => {
          console.error(error);
        });
      }
    }else{
      window.alert('Helytelenül töltötted ki a mezőket!');
    }
  }

}
