export default function PickupBike() {
   const handlePickUp = () => {
    
   };
   return <div>PickupBike</div>;
}

// Reservation details:
//1 - Reservation ID
//2 - Bike ID
//3-  Pick up location
//4 - Pickup time

//pickup bike component:
//1 - we need a button that the user clicks when they are ready to pickup the bike
// click this (BUTTON) to pickup your bike when you are at "location name"
//2- they click button
//3- button sends a post/put request to server.js
//4- server.js listens to this post request,  and in its listener it will have a function that gets the time
