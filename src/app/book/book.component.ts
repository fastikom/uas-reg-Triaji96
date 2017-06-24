import { Component, OnInit } from '@angular/core';

import {BookService} from "./book.service";
import {Book} from "./book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  isNewForm: boolean;
  showForm: boolean;
  formPlayer: Book;
  players: Book[];
  errMesg: any;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(){
    this.bookService.getBooks()
      .subscribe(
        book => this.players = book,
        error => this.errMesg = <any>error
      )
    this.isNewForm = true;
    this.showForm = true;
  }

  savePlayer(player: Book) {
    if(player) {
      if(this.isNewForm) {
        this.bookService.insertBook(player)
          .subscribe((insertedBook) => {
            this.players.push(insertedBook),
            error => console.log(error)
          });
      }else {
        this.bookService.updatePlayer(player)
                          .subscribe(
                            () => {},
                            error => console.log(error)
                          );
      }

      this.showForm = false;
      this.isNewForm = false;
      player = null;
    }
  }

  showPlayerForm(player: Book) {
    if(!player) {
      player = new Book();
      this.isNewForm = true;
    }

    this.showForm = true;
    this.formPlayer = player;
  }

  removePlayer(player: Book) {
    this.bookService.deletePlayer(player)
      .subscribe(
        () => this.removePlayerFromList(player),
        error => console.log(error)
      );
  }

  private removePlayerFromList(player: Book) {
      var index = this.players.indexOf(player, 0);

      if (index > -1) {
          this.players.splice(index, 1);
      }
  }
}
