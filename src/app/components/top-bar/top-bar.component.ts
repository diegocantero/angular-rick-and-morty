import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  title: string = "Characters";

  constructor() { }

  ngOnInit(): void {
    const app = (() => {
      let body: HTMLBodyElement | null;
      let menu: HTMLBodyElement | null;
      let menuItems;

      const init = () => {
        body = document.querySelector('body');
        menu = document.querySelector('.menu-icon');
        menuItems = document.querySelectorAll('.nav__list-item');

        applyListeners();
      }

      const applyListeners = () => {
        menu?.addEventListener('click', () => toggleClass(body, 'nav-active'));
      }

      const toggleClass = (element:HTMLBodyElement | null, stringClass:string) => {
        if (element?.classList.contains(stringClass))
          element?.classList.remove(stringClass);
        else
          element?.classList.add(stringClass);
      }

      init();
    })();


  }

}
