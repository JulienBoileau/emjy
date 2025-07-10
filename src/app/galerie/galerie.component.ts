import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-galerie',
  imports: [NgFor, NgIf],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.css'
})
export class GalerieComponent {

  @ViewChild('photosSection') photosSection!: ElementRef;

  albums = [
    {
      title: 'Le Cardinal Brive',
      date: '4 Juin 2025',
      cover: 'assets/cardinal/cardinal_affiche.jpeg',
      photos: [
        { thumb: 'assets/cardinal/petites/cardinal_thumb00001.jpeg', full: 'assets/cardinal/grandes/cardinal00001.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00002.jpeg', full: 'assets/cardinal/grandes/cardinal00002.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00003.jpeg', full: 'assets/cardinal/grandes/cardinal00003.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00004.jpeg', full: 'assets/cardinal/grandes/cardinal00004.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00005.jpeg', full: 'assets/cardinal/grandes/cardinal00005.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00006.jpeg', full: 'assets/cardinal/grandes/cardinal00006.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00007.jpeg', full: 'assets/cardinal/grandes/cardinal00007.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00008.jpeg', full: 'assets/cardinal/grandes/cardinal00008.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00009.jpeg', full: 'assets/cardinal/grandes/cardinal00009.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00010.jpeg', full: 'assets/cardinal/grandes/cardinal00010.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00011.jpeg', full: 'assets/cardinal/grandes/cardinal00011.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00012.jpeg', full: 'assets/cardinal/grandes/cardinal00012.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00013.jpeg', full: 'assets/cardinal/grandes/cardinal00013.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00014.jpeg', full: 'assets/cardinal/grandes/cardinal00014.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00015.jpeg', full: 'assets/cardinal/grandes/cardinal00015.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00016.jpeg', full: 'assets/cardinal/grandes/cardinal00016.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00017.jpeg', full: 'assets/cardinal/grandes/cardinal00017.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00018.jpeg', full: 'assets/cardinal/grandes/cardinal00018.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00019.jpeg', full: 'assets/cardinal/grandes/cardinal00019.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00020.jpeg', full: 'assets/cardinal/grandes/cardinal00020.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00021.jpeg', full: 'assets/cardinal/grandes/cardinal00021.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00022.jpeg', full: 'assets/cardinal/grandes/cardinal00022.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00023.jpeg', full: 'assets/cardinal/grandes/cardinal00023.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00024.jpeg', full: 'assets/cardinal/grandes/cardinal00024.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00025.jpeg', full: 'assets/cardinal/grandes/cardinal00025.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00026.jpeg', full: 'assets/cardinal/grandes/cardinal00026.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00027.jpeg', full: 'assets/cardinal/grandes/cardinal00027.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00028.jpeg', full: 'assets/cardinal/grandes/cardinal00028.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00029.jpeg', full: 'assets/cardinal/grandes/cardinal00029.jpeg' },
        { thumb: 'assets/cardinal/petites/cardinal_thumb00030.jpeg', full: 'assets/cardinal/grandes/cardinal00030.jpeg' },

      ]
    },
    {
      title: 'L\'Empire Bordeaux',
      date: '19 Juillet 2025',
      cover: 'assets/affiche_juillet.jpeg',
      photos: [
        { thumb: 'assets/background.png', full: 'assets/background.png' },
        { thumb: 'assets/background.png', full: 'assets/background.png' },
        { thumb: 'assets/background.png', full: 'assets/background.png' }
      ]
    },
    // ajoute autant d’albums que tu veux
  ];

  selectedAlbum: any = null;

  selectAlbum(album: any) {
    this.selectedAlbum = album;
    setTimeout(() => {
      this.photosSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  selectedImage: string | null = null;

openImage(image: string) {
  this.selectedImage = image;
}

closeImage(event?: Event) {
  if (event) {
    event.stopPropagation();
  }
  this.selectedImage = null;
}

}
