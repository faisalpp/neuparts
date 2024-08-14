'use client'
import {Provider} from 'react-redux'
import {makeStore} from './index'
import { useRef } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export function StoreProvider({children}){
  
  const storeRef = useRef();
  const storePersistRef = useRef()
  if(!storeRef.current){
    const store = makeStore();
    storeRef.current = store;
    storePersistRef.current = persistStore(store)
  }
  return (
    <Provider store={storeRef.current} >
     <PersistGate loading={null} persistor={storePersistRef.current} >
      {children}
     </PersistGate>
    </Provider>
  )
}