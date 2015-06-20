#lang scheme

(require "geometry.scm")

(define r (shape 10 5))
(display-shape r)  
(define (position x y)(cons x y))
  
  
  
  ;(define (square x) (* x x))
  ;(define (wackySquare x)
  ;  (if (< x 4)
  ;      (square x)
  ;      (+ 1 (square x))))
  
  ;(define (rat n d)(cons n d))
  
  ;(define (print-rat x)
  ;  (display (numer x))
  ;  (display "/")
  ;  (display (denom x)))
  
  ;(define (numer x)(car x))
  ;(define (denom x)(cdr x))
  
  ;(define half (rat 1 2))
  
