document.addEventListener('DOMContentLoaded',function(){
    const socket = io();

    //DOM element
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatOutput = document.getElementById('chat-output');

    //Event listeners

    sendButton.addEventListener('click',sendMessage);
    
    //Listen for message from the server
    socket.on('chat-message',function(data){
      displayMessage(data);
    });
    
    //Function to send message
    function sendMessage(){
        const message = messageInput.value.trim();

        if(message !==''){
            //Emit the message to the server
            socket.emit('chat-message',{
               user:'You',
                message:message,
                server1: 'AI',
              //  messageFromServer:'welcome to Swastik Coaching Center'
               messageFromServer:serverFunction(message),
            });
            //Clear the input field
            messageInput.value ='';
        }
    }


    //dynamic msg
//     function serverFunction(message){
//     const keyword = ['hii','standard','fees','time','subject','hour','batch']; 
//     const newkeyword = message.split(' ');

//     let l1 = keyword.length;
//     let l2 = newkeyword.length;
//     console.log(l2);
//     let ans = '';

//   //  for(let i=0; i<l1; i++){
//    //    console.log(keyword[i]);
//          for(let j=0; j<l2; j++){
//             console.log(newkeyword[j]);
//           //   if(keyword[i]===newkeyword[j]){
//             if(newkeyword[j]==='hii'){
//               ans = 'welcome to swastik coaching center';
//           }else if(newkeyword[j]==='standard'){
//                  ans = '1 to 10 standard student are allow in swastik coaching center we guide properly';
//              }else if(newkeyword[j]==='fees'){
//                  ans = 'fees are different by standard';
//              }else if(newkeyword[j]==='time'){
//                 ans = 'center is open 7am to 8pm';
//              }else if(newkeyword[j]==='subject'){
//               ans = 'you can get in package to include all subject and also you have choice to get selected subject';
//            }else if(newkeyword[j]==='hour'){
//             ans = 'time will divide by your subject';
//          }else if(newkeyword[j]==='batch'){
//           ans = 'available morning and evening batches';
//        }else{
//                 ans = 'please ask correct answer';
//              }

//          }
     
//          return ans;  
// }

function serverFunction(message){
  const keyword = ['hii','standard','fees','time','subject','hour','batch'];
  const messageWords = message.split(' ');
  let ans = '';
  let keywordFound = false;

  for (let i = 0; i < messageWords.length; i++) {
      const keywordIndex = keyword.indexOf(messageWords[i].toLowerCase());

      if (keywordIndex !== -1 && !keywordFound) {
          // Keyword found
          ans = generateAnswer(keyword[keywordIndex]) + ' ';
          keywordFound = true;//Set to true to stop searching for other keywords
      } else if (!keywordFound){
          ans = 'Ask a correct question. ';
      }
  }

  return ans.trim(); // Trim to remove leading/trailing spaces
}
// Function to generate an answer based on the keyword
function generateAnswer(keyword) {
switch (keyword) {
  case 'hii':
      return 'welcome to swastik coaching center';
      break;
  case 'standard':
      return '1 to 10 standard student are allow in swastik coaching center we guide properly';
  case 'fees':
      return 'fees are different by standard';
  case 'time':
      return 'center is open 7am to 8pm';
  case 'subject':
      return 'you can get in package to include all subject and also you have choice to get selected subject';
  case 'batch':
      return 'available morning and evening batches';
  case 'hour':
      return 'time will divide by your subject';    
  default:
      return 'Ask a correct question.';
}
}

    //Function to dislay a message in the chat
    function displayMessage(data){
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${data.user}:<strong>${data.message}
        <br> 
        <strong>${data.server1}:</strong>${data.messageFromServer}`;
        chatOutput.appendChild(messageElement);

        //scroll to the bottom of the chat
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});