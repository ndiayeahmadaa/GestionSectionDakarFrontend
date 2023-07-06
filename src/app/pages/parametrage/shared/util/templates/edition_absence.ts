
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import {formatDate} from "../formatageDate";
import { Word } from "../util";

// import { Packer } from "docx";
// import * as fs from 'file-saver';

export let genererPDFAbs = function (attestation, suiviAttestation?) {

  let prenom = attestation.agent.prenom
  let nom = attestation.agent.nom
  let matricule = attestation.agent.matricule
  let lieuNaissance = attestation.agent.lieuNaissance
  let mail = "pad@portdakar.sn"
  let titre = "";
  if(attestation.agent.sexe){
     titre = attestation.agent.sexe.toLowerCase() == 'm' ? 'Monsieur' : attestation.agent.matrimoniale.toLowerCase() == 'marié(e)' ? 'Madame' : 'Mademoiselle'
  }
  let pronom = "";
  if(attestation.agent.sexe){
    pronom = attestation.agent.sexe.toLowerCase() == 'm' ? 'Il' : attestation.agent.sexe.toLowerCase() == 'f' ? 'Elle' : 'Elle'
  }
  let debut = ""
  if(attestation.fonctionDemandeur){
    debut = attestation.fonctionDemandeur.startsWith('A'||'O'||'E'||'Y'||'I'||'u') ? 'd\'' : 'de'
  }
  let directeur = 'Fatoumata Diop'
  let dateEngagement = formatDate(new Date(attestation.agent.dateEngagement))
  let dateNaissance = formatDate(new Date(attestation.agent.dateNaissance))
  let date = formatDate(new Date())
  let numero = attestation.id
  let fonction = attestation.fonctionDemandeur
  let direction = attestation.uniteDemandeur
  let responsableDCH = attestation.directeurSectorielDCH
  let nomTr;
  let prenomTr;
   if(attestation!=null){
    nomTr = attestation.nom
    prenomTr = attestation.prenom
  }

  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  var imageSenegal = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAeFBMVEUAhT/jGyP970L/9EIAgj91qUD+9kPrdC7iCyIAhj//80IAgz8Afj8AfD/+70IAgD/Q10HL1EFopECDsEDu50LBz0GKs0B8rUDa3EGQtkAaij+WuUAnjT/j4UIzkD/37EK4zEEAdj9ZnkCpwkFClT9OmT+fvUBspkAaEGJuAAADbklEQVR4nO3a2XKjMBCFYQ+SmYlACK9x7HiZLPb7v+GwOMSOBcI15Zvm78uEQ1W+UqMOaDR6WOmxih5V8e8/vx5WjyPBBBNMMMEEE0wwwQQTTDDBBBNMMMEEE0wwwQQTTDDBBBNMMMEEE0wwwQQTTDDBBBNMMMEEE0wwwQQTTDDBBBNMMMEEE0wwwQQTTDDBBBNMMHmwiTkYTK4rM9ZkmFzX5O/kjqsHYaKe0+c7Lh+GiR5pTK4rT0dpjsllmVmxTmb9d54hmKgq0f/6IZis0iKQrjD5LrPUZWDZu3kGYKKeqsRT78AATKrWuad55JuYF10nXvo2j3yTeH2OrGNMzrW154jdYlKX2eivyKZn84g3iV+bzGvP5pFukjWtUzZPv5co0k3M0TUZd+zXPNJN1O4itOuXkWOSKU/Fc3sRsvPYd9HPjhJjks0/3NNt/Yh5rnC7eSbUpFgnS5vcfZ/ELuWuk/LZkSc6nLy+TZLf3keSSWSit/Suu6RvkWcrEmVS/Dnvd/RPYt+9U5wwk0ht1y6crsqtt/57SDMpGmhsw/Gi7LhtgpNnksULF+6fxC3itklfnkmxUopRJRB3H/P2OV+iSTGqbLr7x25uhhLpJsWjdjVqH1X0aNUZFmpSjB3TtlHFP5QMwKQcVfwrRfuHkkGYRPHUt/0k0+DbNsEmkf85a4M5uSbm4N+QXfBsm1wTNW15nkyDTyKpJlnWuu9EgVfVYk2iRavJYqjrRJ3ahjZ9CkSlmmTm8gmbpJfbsgsclpVqEk0uWsft8t0FURo4LCvVRI2/W8fOlFEz2zsr1eS7dbSeFP8EZ2qiGyU3zP93mtZJP/e1gNl/Nj/rbh6hJur5vCjssXmdlsXHc//o7pPmUk3qfUavr96UqNW6pkqGaJJXbWJPN784VUul+6S5TJPyNHkxlBxuXkNn8aEcVbpPmss0KU+Tu533NbSZV6NKV1qmySodeb6N11V+a+8+LCvSxCxT37fxr1J5knadNBdpotzXUNJitn9zHXGRJvmm9RtfXVm86dh5RJoEvlWErpBp8n+FCSaYYIIJJphgggkmmGCCCSaYYIIJJphgggkmmGCCCSaYYIIJJphgggkmmGCCCSaYYIIJJphgggkmmGCCCSaYYIIJJphgggkmmGCCCSaYYIIJJphggslATP4BBC7k8xG16O0AAAAASUVORK5CYII=';
  var logoPort = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTg4ODA2RjdERjEwMTFFNjkzQzdDMzNFQzkxMDJDMEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTg4ODA2RjhERjEwMTFFNjkzQzdDMzNFQzkxMDJDMEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ODg4MDZGNURGMTAxMUU2OTNDN0MzM0VDOTEwMkMwRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5ODg4MDZGNkRGMTAxMUU2OTNDN0MzM0VDOTEwMkMwRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmyseoMAAEjmSURBVHja7H0HYFzV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';

  var docDefinition = {
    content: [
      {
        margin: 20,
        columns: [
          // {

          // },
   
          {
            margin: [0, 0, 0, 0],
            width: 300,
            height: 15,
            // bold: true,
            fontSize: 8  ,
            // color: '#000080',
            text: [
              {text: 'Traitée par : ' + Word.generateInitial(prenomTr) + '.' + Word.generateInitial(nomTr)+ '',margin: [0, 0, 0, 0]}, {text: '\n\nREPUBLIQUE DU SENEGAL',fontSize:9,bold:true,color: '#000080'},{text:'\nUn Peuple – Un But – Une Foi',fontSize:7,color: '#000080',margin: [20, 0, 0, 0]}
             
            ]
            // text:,
           
            
          },
          
              
          {
            margin: [0, 0, 0, 0],
            bold: true,
            text: '\n\nDakar,le.................\nM...................\nN° Mle.......................\Service\n\t\t\t\t\tA\nMonsieur le Directeur Général\ndu port Autonome de Dakar\nVoie Hiérarchique',
            fontSize: 10,
            color: '#000080',
            
          },

      //     {
      //   margin: [0, 0, 0, 0],
      //   text: 'Dakar, le ' + date,
      // },
         
        ]
      },
      
     
      {
            margin: [50, 0, 0, 0],
            fontSize: 10,
            image: imageSenegal,
             fit: [40, 50]
            },
            {
              columns: [
                {
                  margin: [20, 10, 0, 0],
                  fontSize: 10,
                  bold: true,
                  color: '#000080',
                  text: 'MINISTERE DES PÊCHES  ET \nDE L\'ECONOMIE MARITIME \n-------------------------------------\nPORT AUTONOME DE DAKAR ',
                 },
                 {
                  fontSize: 8,
                  italics: true,
                  color: '#0f217a',
                  bold: true,
                  margin: [60, 20, 0, 0],
                   text: 'Dakar, le ' + date ,
                 }
              ]
            },
      {
        columns: [
          {
            margin: [20, 10, 0, 0],
             width: 'auto',
              height: 100,
             image: logoPort,
             fit: [60, 40]
            },
          {
            margin: [10, 0, 0, 5],
             width: 'auto',
            // height: 100,
            fontSize: 8,
            color: '#0f217a',
            text: [
             {text: '21, Boulevard de la Libération\nB.P. 3195  DAKAR – SENEGAL\nTel: (221) 33 849.45.45- 33.823.14.70\nFAX: (221) 33 823.36.06\nTELEX: 210404 PADKR\nNINEA : 00 199 86-2-G3\nE- mail:'},{text: 'pad@portdakar.sn',}
            ]
             
           }
          ]
          },
        ]
        }
      
      }