import Image from "next/image";
import Head from 'next/head'
import axios from 'axios';
import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Home() {
  const RIGHT_PANEL_MIN_WIDTH = 340;
  const LEFT_PANEL_MIN_WIDTH = 400;
  const [timePeriod, setTimePeriod] = React.useState(0);
  const [eventSearchState, setEventSearchState] = React.useState(false);
  const [eventProps, setEventProps] = React.useState([true, true]);
  const eventField = React.useRef(null);

  const headers = {
     "Access-Control-Allow-Origin": 'http://localhost:3000',
      'Access-Control-Request-Method': 'GET',
  };

  const [users, setUsers] = React.useState([
    {
      'id': '32',
      'name': 'Мирзиахмед',
      'surname': 'Викторович',
      'job': 'Грузчик'
    }, 
    {
      'id': '12',
      'name': 'Александер',
      'surname': 'Садовников',
      'job': 'Методист'
    }, 
  ]);

  const [events, setEvents] = React.useState([
    {
      'name': 'Мирзиахмед Викторович',
      'location': 'Склад Б',
      'datetime': '08:08 20.11.24'
    }, 
    {
      'name': 'Мирзиахмед Викторович',
      'location': 'Офис А',
      'datetime': '08:08 20.11.24'
    }, 
  ]);

  const [currentUser, setCurrentUser] = React.useState({
    'name': 'Александр',
    'surname': 'Садовников',
    'lastname': 'Владимирович',
    'job': 'Методист',
    'department': 'Большие Данные',
    'age': '35',
    'images': [
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
      'https://sun77-1.userapi.com/s/v1/ig2/BH_z2Tt8nKEOCZ3i42yRrLhZf13yj_9Ntn4EiQNuJ-9tu7JXZro9wnDFctSDUe8hl_6WUQQMvpVUfT6EF9AxRLYP.jpg?quality=95&crop=141,184,1453,1453&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080,1280x1280,1440x1440&ava=1&u=gcvzguyLtcy-pHQ-kARNg8U6L254-hd1BJ6TuX9XYrQ&cs=200x200',
    ]
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/users/')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      setUsers(data);
    });

    fetch('http://127.0.0.1:8000/events/')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      setEvents(data);
      setEventProps([...Array(data.length).fill(true)]);
    });
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      eventField.current.style.transitionProperty = "all";
      eventField.current.style.marginTop = "0px"
    });
    
  }, [events])

  function pushEvent(name, location, datetime) {
    const newEvent = {
      'name': name, 
      'location': location,
      'datetime': datetime
    };
    eventField.current.style.transitionProperty = "none";
    eventField.current.style.marginTop = "-84px"
    setEvents(events => [...events, newEvent]);
  }

  function handleUserSelect(id) {
    fetch(`http://127.0.0.1:8000/user?id=${id}`)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      seCurrentUser(data);
    });
  }

  return (
    <>
      <Head>
        <title>Админ-панель</title>
      </Head>
      <div className="flex justify-stretch h-[calc(100vh-80px)]">
        <div className="flex flex-col justify-between flex-none w-[28%]bg-gradient-to-t from-[#8787ee]/[0.04] to-[#1919ef]/[0.04] border-r-[1px] border-[#5c5c7c]/40"
        style={{ minWidth: `${LEFT_PANEL_MIN_WIDTH}px`}}>
          <div className="grow overflow-y-auto no__overflow">
            { users.map((user, index) => {
              return (
                <div id={user.id} onClick={(e) => handleUserSelect(e.target.id)} key={index} className="flex gap-4 h-[80px] hover:bg-white/5 cursor-pointer">
                  <div className="flex flex-col justify-center pl-5">
                    <Image
                      src="/user.svg"
                      alt="user alt"
                      width={40}
                      height={40}
                      className="cursor-pointer select-none"
                    />
                  </div>
                  <div className="select-none grow flex justify-between border-[#5c5c7c]/40 border-b-[1px] pr-5">
                    <div className="flex flex-col justify-center">
                      <h4 className="leading-none font-bold text-[15px]">{user.name} {user.surname}</h4>
                      <h4 className="leading-none text-[12px] text-white/50">{user.job}</h4>
                    </div>
                    <div className="flex flex-col justify-center">
                      <Image
                        src="/cross.svg"
                        alt="user alt"
                        width={20}
                        height={20}
                        className="cursor-pointer select-none"
                      />
                    </div>
                  </div>
                </div>
              );
            }) }
          </div>
          <div className="shadow-[0px_-4px_30px_0_rgba(0,0,0,0.15)] flex-none px-5 gap-5 flex justify-between flex-wrap content-center h-16 bg-gradient-to-t from-[#8787ee]/[0.04] to-[#1919ef]/[0.04] border-t-[1px] border-[#5c5c7c]/40">
            <div className="px-2 flex justify-between gap-2 rounded-lg bg-black/10 border border-[#5c5c7c]/40 grow focus:outline-none focus:border-slate-700">
                <label htmlFor="userSearch" className="h-full flex flex-col justify-center w-fit flex-none">
                  <Image
                      src="/search.svg"
                      alt="search icon"
                      width={10}
                      height={10}
                  />
                </label>
              <input type="text" name="userSearch" id="userSearch" className="h-7 text-[14px] bg-transparent border-none outline-none grow" />
            </div>
            <Image
                  src="/add.svg"
                  alt="add icon"
                  width={20}
                  height={20}
                  className="cursor-pointer select-none"
                  // onClick={() => pushEvent('pedro', 'pedro', 'pedro')}
              />
          </div>
        </div>
        <div className="grow p-5">
          <div className="pb-7 flex flex-col justify-between gap-7 h-full overflow-hidden rounded-xl bg-gradient-to-t from-[#8787ee]/[0.04] to-[#1919ef]/[0.04] border-[1px] border-[#5c5c7c]/40">
            <div className="flex justify-between gap-8 w-full h-[60%] pt-7  pl-7">
              <div className="relative h-full w-[250px] overflow-hidden rounded-xl bg-gradient-to-t from-[#8787ee]/[0.04] to-[#1919ef]/[0.04] border-[1px] border-[#5c5c7c]/40">
                <Image
                    src={currentUser.images[0]}
                    alt={`${currentUser.name} picture`}
                    layout={'fill'}
                    objectFit={'contain'}
                    className="cursor-pointer select-none h-full w-full"
                />
              </div>
              <div className="flex flex-col gap-8 grow pt-7">
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col gap-5">
                    <h4 className="leading-none font-medium text-[17px] text-white/40">Фамилия:</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white/40">Имя:</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white/40">Отчество:</h4>
                  </div>
                  <div className="flex flex-col gap-5">
                    <h4 className="leading-none font-medium text-[17px] text-white">{currentUser.surname}</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white">{currentUser.name}</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white">{currentUser.lastname}</h4>
                  </div>
                </div>
                <hr className="border-[#5c5c7c]/40" />
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col gap-6">
                    <h4 className="leading-none font-medium text-[17px] text-white/40">Должность:</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white/40">Возраст:</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white/40">Отдел:</h4>
                  </div>
                  <div className="flex flex-col gap-6">
                    <h4 className="leading-none font-medium text-[17px] text-white">{currentUser.job}</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white">{currentUser.age}</h4>
                    <h4 className="leading-none font-medium text-[17px] text-white">{currentUser.department}</h4>
                  </div>
                </div>
              </div>            
            </div>
            <hr className="border-[#5c5c7c]/40 w-full ml-7"/>
            <div className="grow relative">
              <div className="absolute inset-0 overflow-hidden px-7">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={3.4}
                  className="px-7"
                >
                  { currentUser.images.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="relative aspect-square h-full overflow-hidden rounded-xl bg-gradient-to-t from-[#8787ee]/[0.04] to-[#1919ef]/[0.04] border-[1px] border-[#5c5c7c]/40">
                          <Image
                              src={image}
                              alt={`${currentUser.name} picture`}
                              layout={'fill'}
                              objectFit={'contain'}
                              className="cursor-pointer select-none relative"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  }) }
                </Swiper>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden flex flex-col justify-between flex-none w-[23%] bg-gradient-to-t from-[#8787ee]/[0.04] to-[#1919ef]/[0.04] border-l-[1px] border-[#5c5c7c]/40"
        style={{ minWidth: `${RIGHT_PANEL_MIN_WIDTH}px`}}>
            <div ref={eventField} className="transition-all duration-500 grow p-5 overflow-y-auto no__overflow">
              { events.slice(0).reverse().map((event, index) => {
                return (
                  <div key={index} className="h-16 mb-5 flex-none flex gap-3 px-4 flex-wrap content-center rounded-3xl
                  bg-gradient-to-t from-[#8787ee]/[0.08] to-[#1919ef]/[0.08] border-[#5c5c7c]/40 border-[1px] overflow-hidden">
                    <Image
                      src="/user.svg"
                      alt="user alt"
                      width={38}
                      height={38}
                      className="select-none"
                    />
                    <div className="flex flex-col justify-center">
                      <h4 className="leading-none text-[11px] text-white/50">Прошел(а) в {event.location}</h4>
                      <h4 className="leading-none font-bold text-[14px]">{event.name}</h4>
                      <h4 className="leading-none font-thin text-[11px] text-white/50">В {event.datetime}</h4>
                    </div>
                  </div>
                );
              }) }
            </div>
            <div
              className="flex-none shadow-[0px_-4px_30px_0_rgba(0,0,0,0.15)] overflow-hidden px-5 gap-5 flex justify-between flex-wrap content-center
              h-16 bg-gradient-to-t from-[#8787ee]/[0.04] to-[#1919ef]/[0.04] border-t-[1px] border-[#5c5c7c]/40"
            >
              <div
                className="transition-all duration-500 px-2 flex justify-between gap-2 rounded-lg bg-black/10 border border-[#5c5c7c]/40 focus:outline-none focus:border-slate-700"
                style={{ width: eventSearchState ? '100%' : '50px' }}
              >
                <label htmlFor="eventSearch" className="h-full flex flex-col justify-center w-fit flex-none">
                  <Image
                      src="/search.svg"
                      alt="search icon"
                      width={10}
                      height={10}
                      className="select-none"
                  />
                </label>
                
                <input type="text" id="eventSearch" className="h-6 text-[14px] bg-transparent border-none outline-none w-full"
                onFocus={() => setEventSearchState(true)} onBlur={() => setEventSearchState(false)}/>
              </div>
              <div
                className="px-1 relative grid grid-flow-col justify-around content-center grow flex-none w-[100px] h-7 transition-all
                rounded-lg bg-gradient-to-t from-[#8787ee]/[0.08] to-[#1919ef]/[0.08] border border-[#5c5c7c]/40 duration-500"
                style={{ marginRight: eventSearchState ? `-${RIGHT_PANEL_MIN_WIDTH}px` : '0px' }}
              >
                <div className="absolute inset-0 p-1 pointer-events-none">
                  <div className="bg-white/10 w-[calc(100%/3)] h-full rounded-md shadow-sm transition-all duration-500" style={{ marginLeft: `calc(100%/3*${timePeriod})` }}/>
                </div>
                <h4 className="select-none cursor-pointer w-12 text-center font-medium text-[12px] transition-all duration-500" onClick={() => setTimePeriod(0)} style={{ color: timePeriod == 0 ? 'white' : '#818FA4'}}>День</h4>
                <h4 className="select-none cursor-pointer w-12 text-center font-medium text-[12px] transition-all duration-500" onClick={() => setTimePeriod(1)} style={{ color: timePeriod == 1 ? 'white' : '#818FA4'}}>Месяц</h4>
                <h4 className="select-none cursor-pointer w-12 text-center font-medium text-[12px] transition-all duration-500" onClick={() => setTimePeriod(2)} style={{ color: timePeriod == 2 ? 'white' : '#818FA4'}}>Год</h4>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
