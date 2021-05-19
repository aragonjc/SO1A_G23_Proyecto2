import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Inicio',
    path: '/',
    //icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  /*{
    title: 'Region Mas Infectada',
    path: '/',
    //icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },*/
  {
    title: 'Datos Recopilados',
    path: '/data',
    //icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Vacunados por Genero',
    path: '/bygender',
    //icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Ultimos Vacunados',
    path: '/vaccinatedBycountry',
   // icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Paises mas Vacunados',
    path: '/masvacunados',
    //icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Vacunados por pais',
    path: '/AllVaccinatedByCountry',
    //icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Vacunados por edades',
    path: '/agerange',
    //icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];