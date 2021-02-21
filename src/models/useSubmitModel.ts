import {useState} from "react";

export default function useSubmitModel(){
  const [submitting,setSubmitting] = useState(false)
  return {
    submitting,setSubmitting
  }
}
