
import React from 'react'

export function getEmployeeData() {
  return (
    fetch("http://193.227.24.29:5000/api/Employee")
    .then(res => res.json())
  )
}

export function fetchJobGroups() {
  return(
   fetch('http://193.227.24.29:5000/api/JobGroup')
   .then((res) => res.json())
  )
 }
export function fetchJobSubGroups(jobGroupId) {
  return(
   fetch(`http://193.227.24.29:5000/api/JobSubGroup/ByJobGroup/${jobGroupId}`)
   .then((res) => res.json())
  )
 }
export function fetchJobNames(jobSubGroupId) {
  return(
   fetch(`http://193.227.24.29:5000/api/JobNames/ByJobSubGroup/${jobSubGroupId}`)
   .then((res) => res.json())
  )
 }

export function fetchNonExistenceType() {
  return(
   fetch('http://193.227.24.29:5000/api/NonExistanceType')
   .then((res) => res.json())
  )
 }
export function fetchEducationalLevel() {
  return(
   fetch('http://193.227.24.29:5000/api/EducationalLevel')
   .then((res) => res.json())
  )
 }
export function fetchMilitaryStateType() {
  return(
   fetch('http://193.227.24.29:5000/api/MilitaryStateType')
   .then((res) => res.json())
  )
 }
export function fetchVacationType() {
  return(
   fetch('http://193.227.24.29:5000/api/VacationType')
   .then((res) => res.json())
  )
 }
export function fetchVacation() {
  return(
   fetch('http://193.227.24.29:5000/api/Vacation')
   .then((res) => res.json())
  )
 }
export function fetchGeneralAd(sectorId) {
  return(
   fetch(`http://193.227.24.29:5000/api/GeneralAd/BySector/${sectorId}`)
   .then((res) => res.json())
  )
 }
export function fetchSubAd(generalAdId) {
  return(
   fetch(`http://193.227.24.29:5000/api/SubAd/ByGeneralAd/${generalAdId}`)
   .then((res) => res.json())
  )
 }
export function fetchDepartment(subAdId) {
  return(
   fetch(`http://193.227.24.29:5000/api/Department/BySubAd/${subAdId}`)
   .then((res) => res.json())
  )
 }



// http://193.227.24.29/swagger/index.html
// https://fakestoreapi.com/products
// http://193.227.24.29/api/Faculty



