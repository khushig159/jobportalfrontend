const cleanText = (text) => {
  return text
    .replace(/\\n/g, "\n") // Convert literal \n into actual new lines
    .replace(/\*/g, "")    // Optional: remove asterisks
    .trim();
};



export const getAiResponse=async(prompt,file=null)=>{
  const formData=new FormData();

  formData.append('prompt',prompt);
  if(file) formData.append('resumechat',file);

  const response=await fetch(`${import.meta.env.VITE_API_URL}/api/chat`,{
    method:'POST',
    body:formData,
    credentials:'include'
  })
  const data=await response.json()
  return cleanText(data.response)
}