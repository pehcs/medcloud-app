import { useState, useEffect } from 'react'

export function usePatientsData() {
  const [patient, setNewPatient] = useState([]);

  useEffect(()=>{
    fetch("/patients")
    .then((res) => res.json())
    .then((data)=>{
      return (
        setNewPatient(data.results)
        )
      })
  },[patient])

  

  return patient
}
