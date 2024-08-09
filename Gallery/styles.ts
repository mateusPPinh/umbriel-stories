import { styled } from 'styled-components'

export const Container = styled.div<{ hoverState: boolean }>`
   background-color: transparent;
   padding: 0px;
   max-width: 512px;
   width: 100%;
   height: 100%;

   transition: background-color 0.2s, opacity 0.2s;

   &:hover {
      position: relative;
   }

   &:hover::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
   }

   img {
      border-radius: 10px;
      width: 100%;
      height: auto;
   }

   .text-content {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: white;
   }

   .text-content h1 {
      margin: 0;
      font-size: 1.4em;
   }

   .text-content h2 {
      margin: 0;
      font-size: 1em;
   }
`

export const PreviewImage = styled.div`
   padding: 0px;
   max-height: 750px;
   max-width: 512px;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.2);
   border-radius: 10px;


   img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
   }

   .text-content {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: white;
   }

   .text-content h1 {
      margin: 0;
      font-size: 1.4em;
   }

   .text-content h2 {
      margin: 0;
      font-size: 1em;
   }

   a {
      transition: opacity 0.2s;
      &:hover {
         opacity: 0.60;
      }
   }
`
