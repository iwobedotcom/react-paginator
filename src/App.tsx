import React, { useEffect, useState } from "react";
import { Users, UserZ } from "./@types/App";
import { useFetch } from "./hooks/useFetch";

function User({ avatar, username, first_name, last_name, employment }: Users) {
  return (
    <article className="card">
      <img src={avatar} alt={username} />
      <h3>{`${first_name} ${last_name}`}</h3>
      <em>{employment.title}</em>
    </article>
  );
}

function App() {
  const { data, loading } = useFetch();
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<UserZ | []>([]);

  useEffect(() => {
    if (loading) return;
    console.log(data);
    setUsers(data.at(page));
  }, [loading, page, data]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index: number) => {
    setPage(index);
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "react paginator"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {users.map((user: JSX.IntrinsicAttributes & Users) => (
            <User key={user.uid} {...user} />
          ))}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
