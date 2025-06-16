import { configureStore, createSlice } from "@reduxjs/toolkit";


// Product Slice (unchanged)
const productSlice = createSlice({
  name: 'products',
  initialState: {
    veg: [
      { name: 'Tomato', price: 120.45, Image: 'public/images/tamto.jpeg' },
      { name: 'DrumStick', price: 110.23, Image: 'public/images/mulakada.jpeg' },
      { name: 'Carrot', price: 95, Image: 'public/images/carrot.jpeg' },
      { name: 'LadiesFinger', price: 130.15, Image: 'public/images/bkaya.webp' },
      { name: 'Beans', price: 180.45, Image: 'public/images/chikkudu.jpeg' },
      { name: 'Cuabbage', price: 110.45, Image: 'public/images/cuabegge.webp' },
      { name: 'Potato', price: 140, Image: 'public/images/potato.jpg' },
     { name: 'Bottle Gourd', price: 220.45, Image: 'public/images/bottle gourd.jpg' },
     { name: 'Bitter Gourd', price: 150, Image: 'public/images/bitter gourd.jpg' },
     { name: 'Onions', price: 165.45, Image: 'public/images/onions.avif' },
      { name: 'Bringles', price: 128.98, Image: 'public/images/bringle.jpg' },
     { name: 'Ridge Gourd', price: 210, Image: 'public/images/ridge gourd.jpg' }],

    nonveg: [
      { name: 'Chicken', price: 260, Image: 'public/images/chikencurry.jpg' },
      { name: 'MuttonFry', price: 670.23, Image: 'public/images/Mutton.jpg' },
      { name: 'Chicken65', price: 210, Image: 'public/images/chiken65.jpg' },
      { name: 'Mutton Biryani', price: 810, Image: 'public/images/ttonbiryani.jpg' },
      { name: 'FishFry', price: 310, Image: 'public/images/fishfry.jpg' },
      { name: 'Apollo Fish', price: 380, Image: 'public/images/Fish.jpg' },
      { name: 'DumBiryani', price: 350, Image: 'public/images/dum.jpg' },
      { name: 'Crab', price: 450, Image: 'public/images/crab.jpg' },
      { name: 'Butter Chiken', price: 380, Image: 'public/images/butterchiken.jpeg' },
      { name: 'Egg Curry', price: 250, Image: 'public/images/egg curry.jpg' },
      { name: 'Trukey', price: 420, Image: 'public/images/turky.jpg' },
       { name: 'Prawns', price: 450, Image: 'public/images/france.jpg' }],
    Mobiles: [
      { name: 'Nokia', price: 3000, Image: 'public/images/nokia.jpg' },
      { name: 'galaxy 15', price: 22000.98, Image: 'public/images/galaaxy.jpg' },
      { name: 'IQOO Z9x', price: 23000.43, Image: 'public/images/iQOO Z9X 23.webp' },
      { name: 'Carbon', price: 1800, Image: 'public/images/carbon.jpg' },
      { name: 'Vivo y28', price: 28000, Image: 'public/images/VIVO y28 25.jpg' },
      { name: 'One olush 19', price: 25000, Image: 'public/images/onepush 19.webp' },
      { name: 'Iphone 13', price: 38000, Image: 'public/images/iphone 13.webp' },
      { name: 'Narzo', price: 15000, Image: 'public/images/narzo 10.webp' },
      { name: 'JIO', price: 2200, Image: 'public/images/jio.webp' },
      { name: 'Redni 12', price: 18000, Image: 'public/images/redmi r.jpg' },
      { name: 'Samsung 11', price: 28000, Image: 'public/images/samsung r.jpg' }],
    Laptops: [
      { name: 'Apple 16', price: 135000, Image: 'public/images/apple 16.webp' },
      { name: 'Acer 11', price: 38000.98, Image: 'public/images/Acer.webp' },
      { name: 'Dell 13', price: 45000.43, Image: 'public/images/Dell 13.webp' },
      { name: 'HP 15', price: 41000, Image: 'public/images/Hp 15.webp' },
      { name: 'HP 11', price: 36000, Image: 'public/images/hp.jpg' },
      { name: 'Lenevo 13', price: 35000, Image: 'public/images/lenevo.jpg' }]
  },
  reducers: {}
});

//implement local storage
//load the cart from localstorage
const savedcart=localStorage.getItem("cart");
const localStorageCart=savedcart ? JSON.parse(savedcart) : [];

// ✅ Correct Cart Slice
const cartslice = createSlice({
  name: 'cart',
  initialState: localStorageCart,
  reducers: {
    AddToCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...inputItem.payload, quantity: 1 });
      }
    },
    IncCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    DecCart: (state, inputItem) => {
      const item = state.find(item => item.name === inputItem.payload.name);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          return state.filter(i => i.name !== item.name);
        }
      }
    },
    RemoveFromCart: (state, inputItem) => {
      const index = state.findIndex(item => item.name === inputItem.payload.name);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    ClearCart: () => {
      return []; // ✅ Clears cart
    }
  }
});


const orderSlice = createSlice({
  name: 'orders',
  initialState: [],
  reducers: {
    AddOrder: (state, action) => {
      state.push(action.payload);
    }
  }
});
export let{AddToCart,IncCart,DecCart,RemoveFromCart,ClearCart}=cartslice.actions;
export const { AddOrder } = orderSlice.actions;

const userslice=createSlice({
  name:'user',
  initialState:{
users:[],
isAutenticated:false,
currentUser:null
  },
  reducers:{
    registerUser:(state,action)=>{
      state.users.push(action.payload);
    }
  }
})
//export the actions
export const{registerUser}=userslice.actions;


//configure the store
const store=configureStore({
    reducer:{
        products:productSlice.reducer,
        cart:cartslice.reducer,
        orders:orderSlice.reducer,
        users:userslice.reducer
    }
});
//save the cart data to localtorage
  store.subscribe(()=>{
  const state=store.getState();
  localStorage.setItem("cart",JSON.stringify(state.cart));
});

export default store;
