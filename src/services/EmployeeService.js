
import React from 'react'

export function getEmployeeData() {
  return (
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    // .then(data => {console.log(data)})
  )
}

export function fetchJobGroups() {
  return(
   fetch('http://193.227.24.29:5000/api/JobGroup')
   .then((res) => res.json())
  )
 }
export function fetchJobSubGroups() {
  return(
   fetch('http://193.227.24.29:5000/api/JobSubGroup')
   .then((res) => res.json())
  )
 }

// http://193.227.24.29/swagger/index.html
// https://fakestoreapi.com/products
// http://193.227.24.29/api/Faculty



