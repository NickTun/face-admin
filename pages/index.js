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
  const userForm = React.useRef(null);

  const socket = new WebSocket("ws://localhost:8000");

  const headers = {
    "Access-Control-Allow-Origin": 'http://localhost:3000',
    'Access-Control-Request-Method': 'GET',
  };

  const [users, setUsers] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState();
  const [departments, setDepartments] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);

  useEffect(() => {
    Refresh();
    userForm.current.addEventListener('change', () => handleUserUpdate());

    socket.onopen = event => {
      console.log("connected")
    };

    socket.onmessage = event => {
      console.log(`>>> WS data = ${event.data}`);
      const data = JSON.parse(event.data);
      pushEvent(String(data.fullname), String(data.location), Number(data.timestamp));
    };
  }, []);

  function Refresh() {
    fetch('http://127.0.0.1:8000/users/')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      setUsers(data);
    }).catch((error) => {
      console.log(error);
    });

    fetch('http://127.0.0.1:8000/events/')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      setEvents(data);
      setEventProps([...Array(data.length).fill(true)]);
    }).catch((error) => {
      console.log(error);
    });

    fetch('http://127.0.0.1:8000/departments/')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      setDepartments(data);
    }).catch((error) => {
      console.log(error);
    });

    fetch('http://127.0.0.1:8000/jobs/')
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      setJobs(data);
    }).catch((error) => {
      console.log(error);
    });
  }

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
    if(id == 0) {
      setCurrentUser(null);
    } else {
      fetch(`http://127.0.0.1:8000/users/${id}`)
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        setCurrentUser(data);
      });
    }
    
  }

  async function handleUserDelete(id) {
    await axios.post(`http://127.0.0.1:8000/users/${id}/delete`)
    .then(() => {
      Refresh();
      handleUserSelect(0);
    });
  }

  function handleUserUpdate() {
    const user = Object.fromEntries(new FormData(userForm.current).entries());
    axios.post(`http://127.0.0.1:8000/users/${user.id}/update`, {
      'name': user.name,
      'surname': user.surname,
      'lastname': user.lastname,
      'department_id': user.department_id,
      'age': user.age,
      'job_id': user.job_id,
    }).then(() => {
      Refresh();
    });
  }

  function handleUserCreate() {
    axios.post('http://127.0.0.1:8000/users/create', {
      'name': '',
      'surname': '',
      'lastname': '',
      'department_id': 0,
      'age': 0,
      'job_id': 0,
    }).then((response) => {
      Refresh();
      handleUserSelect(response.data.data.id);
    });
  }

  function handleFormUpdate(images) {
    const user = Object.fromEntries(new FormData(userForm.current).entries());
    const newUser = {
      'id': user.id,
      'name': user.name,
      'surname': user.surname,
      'lastname': user.lastname,
      'department_id': user.department_id,
      'age': user.age,
      'job_id': user.job_id,
      'images': images
    };
    setCurrentUser(newUser);
  }

  function handleImageUpload(file, id) {
    if(file) {
      const formData = new FormData();
      formData.append("file", file);
      axios.put(`http://127.0.0.1:8000/images/put?user_id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }).then(() => {
        handleUserSelect(id);
      });
    }
  }

  function handleImageDelete(id, user_id) {
    axios.delete(`http://127.0.0.1:8000/images/${id}/delete`)
    .then(() => {
      handleUserSelect(user_id);
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
                <div id={user.id} className="flex gap-4 h-[80px] hover:bg-white/5 cursor-pointer" key={index}
                onClick={(e) => handleUserSelect(user.id)}
                >
                  <div className="flex flex-col justify-center pl-5">
                    <Image
                      src="/user.svg"
                      alt="user alt"
                      width={40}
                      height={40}
                      className="select-none"
                    />
                  </div>
                  <div className="select-none grow flex justify-between border-[#5c5c7c]/40 border-b-[1px] pr-5">
                    <div className="flex flex-col justify-center">
                      <h4 className="leading-none font-bold text-[15px]">{user.name} {user.surname}</h4>
                      <h4 className="leading-none text-[12px] text-[#8484a4]">{user.job}</h4>
                    </div>
                    <div className="flex flex-col justify-center">
                      <Image
                        src="/cross.svg"
                        alt="user alt"
                        width={20}
                        height={20}
                        className="cursor-pointer select-none"
                        onClick={(e) => {e.stopPropagation(); handleUserDelete(user.id)}}
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
                  onClick={() => handleUserCreate()}
              />
          </div>
        </div>
        <div className="grow p-5">
          <div className="pb-7 flex-col justify-between gap-7 h-full overflow-hidden rounded-xl bg-gradient-to-t from-[#8787ee]/[0.04]
          to-[#1919ef]/[0.04] border-[1px] border-[#5c5c7c]/40" style={{ display: currentUser ? 'flex' : 'none'}}>
            <div className="flex justify-between gap-8 w-full h-[60%] pt-7  pl-7">
              <div className="relative h-full aspect-[3/4] overflow-hidden rounded-xl bg-black/10 border-[1px] border-[#5c5c7c]/40">
                { currentUser && <Image
                    src={`http://localhost:8000/${currentUser.images[0]?.path}`}
                    alt={`${currentUser.name} picture`}
                    layout={'fill'}
                    objectFit={'contain'}
                    className="cursor-pointer select-none h-full w-full"
                />}
              </div>
              <form ref={userForm} onChange={() => handleFormUpdate(currentUser.images)} className="flex flex-col gap-8 grow pt-7 pr-7">
                <input type="hidden" name="id" value={currentUser?.id} />
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col gap-3 2xl:gap-4 w-[120px] 2xl:w-[150px]">
                    <h4 className="leading-none font-medium text-[17px] 2xl:text-[21px] text-[#6a6a83] content-center h-7 2xl:h-8">Фамилия:</h4>
                    <h4 className="leading-none font-medium text-[17px] 2xl:text-[21px] text-[#6a6a83] content-center h-7 2xl:h-8">Имя:</h4>
                    <h4 className="leading-none font-medium text-[17px] 2xl:text-[21px] text-[#6a6a83] content-center h-7 2xl:h-8">Отчество:</h4>
                  </div>
                  <div className="flex flex-col justify-between grow">
                    <input type="text" name="surname" className="w-full h-7 2xl:h-8 border-[1px] border-[#5c5c7c]/40 bg-black/20 outline-none px-[10px]
                    rounded-[10px] leading-none font-medium text-[14px] 2xl:text-[17px] text-white" value={currentUser?.surname} placeholder="Введите фамилию"/>
                    <input type="text" name="name" className="w-full h-7 2xl:h-8 border-[1px] border-[#5c5c7c]/40 bg-black/20 outline-none px-[10px]
                    rounded-[10px] leading-none font-medium text-[14px] 2xl:text-[17px] text-white" value={currentUser?.name} placeholder="Введите имя"/>
                    <input type="text" name="lastname" className="w-full h-7 2xl:h-8 border-[1px] border-[#5c5c7c]/40 bg-black/20 outline-none px-[10px]
                    rounded-[10px] leading-none font-medium text-[14px] 2xl:text-[17px] text-white" value={currentUser?.lastname} placeholder="Введите отчество" />
                  </div>
                </div>
                <hr className="border-[#5c5c7c]/40" />
                <div className="flex gap-5 w-full">
                  <div className="flex flex-col gap-3 2xl:gap-4 w-[120px] 2xl:w-[150px]">
                    <h4 className="leading-none font-medium text-[17px] 2xl:text-[21px] text-[#6a6a83] content-center h-7 2xl:h-8]">Должность:</h4>
                    <h4 className="leading-none font-medium text-[17px] 2xl:text-[21px] text-[#6a6a83] content-center h-7 2xl:h-8">Возраст:</h4>
                    <h4 className="leading-none font-medium text-[17px] 2xl:text-[21px] text-[#6a6a83] content-center h-7 2xl:h-8">Отдел:</h4>
                  </div>
                  <div className="flex flex-col justify-between grow">
                  <select name="job_id" className="w-full h-7 2xl:h-8 border-[1px] border-[#5c5c7c]/40 bg-black/20 outline-none px-[10px]
                    rounded-[10px] leading-none font-medium text-[14px] 2xl:text-[17px] text-white cursor-pointer" value={currentUser?.job_id}>
                      { jobs.map((job, index) => {
                        return (
                          <option key={index} value={job.id}>{job.title}</option>
                        );
                      })}
                    </select>
                    <input type="number" name="age" className="w-full h-7 2xl:h-8 border-[1px] border-[#5c5c7c]/40 bg-black/20 outline-none px-[10px]
                    rounded-[10px] leading-none font-medium text-[14px] 2xl:text-[17px] text-white" value={currentUser?.age} placeholder="Введите возраст"/>
                    <select name="department_id" className="w-full h-7 2xl:h-8 border-[1px] border-[#5c5c7c]/40 bg-black/20 outline-none px-[10px]
                    rounded-[10px] leading-none font-medium text-[14px] 2xl:text-[17px] text-white cursor-pointer" value={currentUser?.department_id}>
                      <option value={0}>Выберите отдел</option>
                      { departments.map((department, index) => {
                        return (
                          <option key={index} value={department.id}>{department.title}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </form>            
            </div>
            <hr className="border-[#5c5c7c]/40 w-full ml-7"/>
            <div className="grow relative">
              <div className="absolute inset-0 overflow-hidden px-7">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={4.2}
                  className="px-7"
                >
                  { currentUser?.images.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="relative aspect-[3/4] h-full overflow-hidden rounded-xl bg-black/10 border-[1px] border-[#5c5c7c]/40">
                          <div className="p-4 absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 opacity-0 hover:opacity-100 transition-all duration-300 z-10">
                            <div className="w-full h-full flex flex-col justify-end flex-wrap content-end">
                              <Image
                                src="/cross_2.svg"
                                alt="user alt"
                                width={22}
                                height={22}
                                className="cursor-pointer select-none"
                                onClick={(e) => handleImageDelete(image.id, currentUser.id)}
                              />
                            </div>
                          </div>
                          <Image
                              src={`http://localhost:8000/${image.path}`}
                              alt={`${currentUser.name} picture`}
                              layout={'fill'}
                              objectFit={'contain'}
                              className="select-none relative"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  }) }
                  <SwiperSlide>
                    <div className="relative flex justify-center content-center aspect-[3/4] flex-wrap
                    h-full overflow-hidden rounded-xl bg-black/10 border-[1px] border-[#5c5c7c]/40">
                      <label htmlFor="image_load_field" className="h-[20%] aspect-square relative cursor-pointer">
                        <Image
                            src={`/add_2.svg`}
                            alt={`add a picture`}
                            layout={'fill'}
                            objectFit={'contain'}
                            className="select-none"
                        />
                      </label>
                      <input id="image_load_field" type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], currentUser.id)}/>
                    </div>
                  </SwiperSlide>
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
                      <h4 className="leading-none text-[11px] text-[#8484a4]">Прошел(а) в {event.location}</h4>
                      <h4 className="leading-none font-bold text-[14px]">{event.user?.name} {event.user?.surname}</h4>
                      <h4 className="leading-none font-light text-[11px] text-[#9f9fc6]">В {new Date(Number(event.timestamp) * 1000).toLocaleString()}</h4>
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
                style={{ width: eventSearchState ? '100%' : '18%' }}
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
