# CatFrame
![alt text](https://raw.githubusercontent.com/caiusno1/CatFrame/main/logo.png "Logo CatFrame")  
CatFrame is a framework to implement categorical concepts in TypeScript. It is highly inspired by the lecture material of [FMDE](https://github.com/anthonyanjorin/fmde). 
(I have the permission to use their ideas under MIT License. Thank you so much!).  
  
Changes are (among others):
* equality function can be given as parameter
* Typing and "Tripleling" are implemented as decorators on generic (concrete) categories
* Categories are always assumed to have pushouts
* Some functions have other names ()
* Merging of Arrows was added (kind of coproduct of arrows)
* Many concepts are not implemented by now (exploiting duality, pushout complements, ...)