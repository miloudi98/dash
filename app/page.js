"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./i18n.js";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Readable } from "stream";
import { PieChart,Cell, Sector, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Legend, ResponsiveContainer } from 'recharts';

import css from "./page.module.css";
import csv from "csv-parser";

const MaleFemaleSurvivalRatio = ({ data, t }) => {
  return (
       <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip formatter={ (value, name) => [value, t(name)]}/>
          <Bar dataKey="survived" stackId="a" fill="lightgreen" label={{ position: "center", fill: "black" }}/>
          <Bar dataKey="died" stackId="a" fill="red" label={{ position: "center", fill: "black" }} />
        </BarChart>
      </ResponsiveContainer>
  );
};

const MaleFemaleSurvivalRatioPercentage = ({ data, t }) => {
  return (
       <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Tooltip formatter={ (value, name) => [value, t(name)]}/>
          <Bar dataKey="died" fill="red" label={{ position: "center", fill: "black" }} />
        </BarChart>
      </ResponsiveContainer>
  );
};

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const titanic_csv = `
male,22,1,0,7.25,S,Third,man,FALSE,0
female,38,1,0,71.2833,C,First,woman,FALSE,1
female,26,0,0,7.925,S,Third,woman,TRUE,1
female,35,1,0,53.1,S,First,woman,FALSE,1
male,35,0,0,8.05,S,Third,man,TRUE,0
male,,0,0,8.4583,Q,Third,man,TRUE,0
male,54,0,0,51.8625,S,First,man,TRUE,0
male,2,3,1,21.075,S,Third,child,FALSE,0
female,27,0,2,11.1333,S,Third,woman,FALSE,1
female,14,1,0,30.0708,C,Second,child,FALSE,1
female,4,1,1,16.7,S,Third,child,FALSE,1
female,58,0,0,26.55,S,First,woman,TRUE,1
male,20,0,0,8.05,S,Third,man,TRUE,0
male,39,1,5,31.275,S,Third,man,FALSE,0
female,14,0,0,7.8542,S,Third,child,TRUE,0
female,55,0,0,16,S,Second,woman,TRUE,1
male,2,4,1,29.125,Q,Third,child,FALSE,0
male,,0,0,13,S,Second,man,TRUE,1
female,31,1,0,18,S,Third,woman,FALSE,0
female,,0,0,7.225,C,Third,woman,TRUE,1
male,35,0,0,26,S,Second,man,TRUE,0
male,34,0,0,13,S,Second,man,TRUE,1
female,15,0,0,8.0292,Q,Third,child,TRUE,1
male,28,0,0,35.5,S,First,man,TRUE,1
female,8,3,1,21.075,S,Third,child,FALSE,0
female,38,1,5,31.3875,S,Third,woman,FALSE,1
male,,0,0,7.225,C,Third,man,TRUE,0
male,19,3,2,263,S,First,man,FALSE,0
female,,0,0,7.8792,Q,Third,woman,TRUE,1
male,,0,0,7.8958,S,Third,man,TRUE,0
male,40,0,0,27.7208,C,First,man,TRUE,0
female,,1,0,146.5208,C,First,woman,FALSE,1
female,,0,0,7.75,Q,Third,woman,TRUE,1
male,66,0,0,10.5,S,Second,man,TRUE,0
male,28,1,0,82.1708,C,First,man,FALSE,0
male,42,1,0,52,S,First,man,FALSE,0
male,,0,0,7.2292,C,Third,man,TRUE,1
male,21,0,0,8.05,S,Third,man,TRUE,0
female,18,2,0,18,S,Third,woman,FALSE,0
female,14,1,0,11.2417,C,Third,child,FALSE,1
female,40,1,0,9.475,S,Third,woman,FALSE,0
female,27,1,0,21,S,Second,woman,FALSE,0
male,,0,0,7.8958,C,Third,man,TRUE,0
female,3,1,2,41.5792,C,Second,child,FALSE,1
female,19,0,0,7.8792,Q,Third,woman,TRUE,1
male,,0,0,8.05,S,Third,man,TRUE,0
male,,1,0,15.5,Q,Third,man,FALSE,0
female,,0,0,7.75,Q,Third,woman,TRUE,1
male,,2,0,21.6792,C,Third,man,FALSE,0
female,18,1,0,17.8,S,Third,woman,FALSE,0
male,7,4,1,39.6875,S,Third,child,FALSE,0
male,21,0,0,7.8,S,Third,man,TRUE,0
female,49,1,0,76.7292,C,First,woman,FALSE,1
female,29,1,0,26,S,Second,woman,FALSE,1
male,65,0,1,61.9792,C,First,man,FALSE,0
male,,0,0,35.5,S,First,man,TRUE,1
female,21,0,0,10.5,S,Second,woman,TRUE,1
male,28.5,0,0,7.2292,C,Third,man,TRUE,0
female,5,1,2,27.75,S,Second,child,FALSE,1
male,11,5,2,46.9,S,Third,child,FALSE,0
male,22,0,0,7.2292,C,Third,man,TRUE,0
female,38,0,0,80,,First,woman,TRUE,1
male,45,1,0,83.475,S,First,man,FALSE,0
male,4,3,2,27.9,S,Third,child,FALSE,0
male,,0,0,27.7208,C,First,man,TRUE,0
male,,1,1,15.2458,C,Third,man,FALSE,1
female,29,0,0,10.5,S,Second,woman,TRUE,1
male,19,0,0,8.1583,S,Third,man,TRUE,0
female,17,4,2,7.925,S,Third,woman,FALSE,1
male,26,2,0,8.6625,S,Third,man,FALSE,0
male,32,0,0,10.5,S,Second,man,TRUE,0
female,16,5,2,46.9,S,Third,woman,FALSE,0
male,21,0,0,73.5,S,Second,man,TRUE,0
male,26,1,0,14.4542,C,Third,man,FALSE,0
male,32,0,0,56.4958,S,Third,man,TRUE,1
male,25,0,0,7.65,S,Third,man,TRUE,0
male,,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,8.05,S,Third,man,TRUE,0
male,0.83,0,2,29,S,Second,child,FALSE,1
female,30,0,0,12.475,S,Third,woman,TRUE,1
male,22,0,0,9,S,Third,man,TRUE,0
male,29,0,0,9.5,S,Third,man,TRUE,1
female,,0,0,7.7875,Q,Third,woman,TRUE,1
male,28,0,0,47.1,S,First,man,TRUE,0
female,17,0,0,10.5,S,Second,woman,TRUE,1
female,33,3,0,15.85,S,Third,woman,FALSE,1
male,16,1,3,34.375,S,Third,man,FALSE,0
male,,0,0,8.05,S,Third,man,TRUE,0
female,23,3,2,263,S,First,woman,FALSE,1
male,24,0,0,8.05,S,Third,man,TRUE,0
male,29,0,0,8.05,S,Third,man,TRUE,0
male,20,0,0,7.8542,S,Third,man,TRUE,0
male,46,1,0,61.175,S,First,man,FALSE,0
male,26,1,2,20.575,S,Third,man,FALSE,0
male,59,0,0,7.25,S,Third,man,TRUE,0
male,,0,0,8.05,S,Third,man,TRUE,0
male,71,0,0,34.6542,C,First,man,TRUE,0
male,23,0,1,63.3583,C,First,man,FALSE,1
female,34,0,1,23,S,Second,woman,FALSE,1
male,34,1,0,26,S,Second,man,FALSE,0
female,28,0,0,7.8958,S,Third,woman,TRUE,0
male,,0,0,7.8958,S,Third,man,TRUE,0
male,21,0,1,77.2875,S,First,man,FALSE,0
male,33,0,0,8.6542,S,Third,man,TRUE,0
male,37,2,0,7.925,S,Third,man,FALSE,0
male,28,0,0,7.8958,S,Third,man,TRUE,0
female,21,0,0,7.65,S,Third,woman,TRUE,1
male,,0,0,7.775,S,Third,man,TRUE,1
male,38,0,0,7.8958,S,Third,man,TRUE,0
female,,1,0,24.15,Q,Third,woman,FALSE,1
male,47,0,0,52,S,First,man,TRUE,0
female,14.5,1,0,14.4542,C,Third,child,FALSE,0
male,22,0,0,8.05,S,Third,man,TRUE,0
female,20,1,0,9.825,S,Third,woman,FALSE,0
female,17,0,0,14.4583,C,Third,woman,TRUE,0
male,21,0,0,7.925,S,Third,man,TRUE,0
male,70.5,0,0,7.75,Q,Third,man,TRUE,0
male,29,1,0,21,S,Second,man,FALSE,0
male,24,0,1,247.5208,C,First,man,FALSE,0
female,2,4,2,31.275,S,Third,child,FALSE,0
male,21,2,0,73.5,S,Second,man,FALSE,0
male,,0,0,8.05,S,Third,man,TRUE,0
male,32.5,1,0,30.0708,C,Second,man,FALSE,0
female,32.5,0,0,13,S,Second,woman,TRUE,1
male,54,0,1,77.2875,S,First,man,FALSE,0
male,12,1,0,11.2417,C,Third,child,FALSE,1
male,,0,0,7.75,Q,Third,man,TRUE,0
male,24,0,0,7.1417,S,Third,man,TRUE,1
female,,1,1,22.3583,C,Third,woman,FALSE,1
male,45,0,0,6.975,S,Third,man,TRUE,0
male,33,0,0,7.8958,C,Third,man,TRUE,0
male,20,0,0,7.05,S,Third,man,TRUE,0
female,47,1,0,14.5,S,Third,woman,FALSE,0
female,29,1,0,26,S,Second,woman,FALSE,1
male,25,0,0,13,S,Second,man,TRUE,0
male,23,0,0,15.0458,C,Second,man,TRUE,0
female,19,0,2,26.2833,S,First,woman,FALSE,1
male,37,1,0,53.1,S,First,man,FALSE,0
male,16,0,0,9.2167,S,Third,man,TRUE,0
male,24,0,0,79.2,C,First,man,TRUE,0
female,,0,2,15.2458,C,Third,woman,FALSE,0
female,22,0,0,7.75,S,Third,woman,TRUE,1
female,24,1,0,15.85,S,Third,woman,FALSE,1
male,19,0,0,6.75,Q,Third,man,TRUE,0
male,18,0,0,11.5,S,Second,man,TRUE,0
male,19,1,1,36.75,S,Second,man,FALSE,0
male,27,0,0,7.7958,S,Third,man,TRUE,1
female,9,2,2,34.375,S,Third,child,FALSE,0
male,36.5,0,2,26,S,Second,man,FALSE,0
male,42,0,0,13,S,Second,man,TRUE,0
male,51,0,0,12.525,S,Second,man,TRUE,0
female,22,1,0,66.6,S,First,woman,FALSE,1
male,55.5,0,0,8.05,S,Third,man,TRUE,0
male,40.5,0,2,14.5,S,Third,man,FALSE,0
male,,0,0,7.3125,S,Third,man,TRUE,0
male,51,0,1,61.3792,C,First,man,FALSE,0
female,16,0,0,7.7333,Q,Third,woman,TRUE,1
male,30,0,0,8.05,S,Third,man,TRUE,0
male,,0,0,8.6625,S,Third,man,TRUE,0
male,,8,2,69.55,S,Third,man,FALSE,0
male,44,0,1,16.1,S,Third,man,FALSE,0
female,40,0,0,15.75,S,Second,woman,TRUE,1
male,26,0,0,7.775,S,Third,man,TRUE,0
male,17,0,0,8.6625,S,Third,man,TRUE,0
male,1,4,1,39.6875,S,Third,child,FALSE,0
male,9,0,2,20.525,S,Third,child,FALSE,1
female,,0,1,55,S,First,woman,FALSE,1
female,45,1,4,27.9,S,Third,woman,FALSE,0
male,,0,0,25.925,S,First,man,TRUE,0
male,28,0,0,56.4958,S,Third,man,TRUE,0
male,61,0,0,33.5,S,First,man,TRUE,0
male,4,4,1,29.125,Q,Third,child,FALSE,0
female,1,1,1,11.1333,S,Third,child,FALSE,1
male,21,0,0,7.925,S,Third,man,TRUE,0
male,56,0,0,30.6958,C,First,man,TRUE,0
male,18,1,1,7.8542,S,Third,man,FALSE,0
male,,3,1,25.4667,S,Third,man,FALSE,0
female,50,0,0,28.7125,C,First,woman,TRUE,0
male,30,0,0,13,S,Second,man,TRUE,0
male,36,0,0,0,S,Third,man,TRUE,0
female,,8,2,69.55,S,Third,woman,FALSE,0
male,,0,0,15.05,C,Second,man,TRUE,0
male,9,4,2,31.3875,S,Third,child,FALSE,0
male,1,2,1,39,S,Second,child,FALSE,1
female,4,0,2,22.025,S,Third,child,FALSE,1
male,,0,0,50,S,First,man,TRUE,0
female,,1,0,15.5,Q,Third,woman,FALSE,1
male,45,0,0,26.55,S,First,man,TRUE,1
male,40,1,1,15.5,Q,Third,man,FALSE,0
male,36,0,0,7.8958,S,Third,man,TRUE,0
female,32,0,0,13,S,Second,woman,TRUE,1
male,19,0,0,13,S,Second,man,TRUE,0
female,19,1,0,7.8542,S,Third,woman,FALSE,1
male,3,1,1,26,S,Second,child,FALSE,1
female,44,0,0,27.7208,C,First,woman,TRUE,1
female,58,0,0,146.5208,C,First,woman,TRUE,1
male,,0,0,7.75,Q,Third,man,TRUE,0
male,42,0,1,8.4042,S,Third,man,FALSE,0
female,,0,0,7.75,Q,Third,woman,TRUE,1
female,24,0,0,13,S,Second,woman,TRUE,0
male,28,0,0,9.5,S,Third,man,TRUE,0
male,,8,2,69.55,S,Third,man,FALSE,0
male,34,0,0,6.4958,S,Third,man,TRUE,0
male,45.5,0,0,7.225,C,Third,man,TRUE,0
male,18,0,0,8.05,S,Third,man,TRUE,1
female,2,0,1,10.4625,S,Third,child,FALSE,0
male,32,1,0,15.85,S,Third,man,FALSE,0
male,26,0,0,18.7875,C,Third,man,TRUE,1
female,16,0,0,7.75,Q,Third,woman,TRUE,1
male,40,0,0,31,C,First,man,TRUE,1
male,24,0,0,7.05,S,Third,man,TRUE,0
female,35,0,0,21,S,Second,woman,TRUE,1
male,22,0,0,7.25,S,Third,man,TRUE,0
male,30,0,0,13,S,Second,man,TRUE,0
male,,1,0,7.75,Q,Third,man,FALSE,0
female,31,1,0,113.275,C,First,woman,FALSE,1
female,27,0,0,7.925,S,Third,woman,TRUE,1
male,42,1,0,27,S,Second,man,FALSE,0
female,32,0,0,76.2917,C,First,woman,TRUE,1
male,30,0,0,10.5,S,Second,man,TRUE,0
male,16,0,0,8.05,S,Third,man,TRUE,1
male,27,0,0,13,S,Second,man,TRUE,0
male,51,0,0,8.05,S,Third,man,TRUE,0
male,,0,0,7.8958,S,Third,man,TRUE,0
male,38,1,0,90,S,First,man,FALSE,1
male,22,0,0,9.35,S,Third,man,TRUE,0
male,19,0,0,10.5,S,Second,man,TRUE,1
male,20.5,0,0,7.25,S,Third,man,TRUE,0
male,18,0,0,13,S,Second,man,TRUE,0
female,,3,1,25.4667,S,Third,woman,FALSE,0
female,35,1,0,83.475,S,First,woman,FALSE,1
male,29,0,0,7.775,S,Third,man,TRUE,0
male,59,0,0,13.5,S,Second,man,TRUE,0
female,5,4,2,31.3875,S,Third,child,FALSE,1
male,24,0,0,10.5,S,Second,man,TRUE,0
female,,0,0,7.55,S,Third,woman,TRUE,0
male,44,1,0,26,S,Second,man,FALSE,0
female,8,0,2,26.25,S,Second,child,FALSE,1
male,19,0,0,10.5,S,Second,man,TRUE,0
male,33,0,0,12.275,S,Second,man,TRUE,0
female,,1,0,14.4542,C,Third,woman,FALSE,0
female,,1,0,15.5,Q,Third,woman,FALSE,1
male,29,0,0,10.5,S,Second,man,TRUE,0
male,22,0,0,7.125,S,Third,man,TRUE,0
male,30,0,0,7.225,C,Third,man,TRUE,0
male,44,2,0,90,Q,First,man,FALSE,0
female,25,0,0,7.775,S,Third,woman,TRUE,0
female,24,0,2,14.5,S,Second,woman,FALSE,1
male,37,1,1,52.5542,S,First,man,FALSE,1
male,54,1,0,26,S,Second,man,FALSE,0
male,,0,0,7.25,S,Third,man,TRUE,0
female,29,1,1,10.4625,S,Third,woman,FALSE,0
male,62,0,0,26.55,S,First,man,TRUE,0
male,30,1,0,16.1,S,Third,man,FALSE,0
female,41,0,2,20.2125,S,Third,woman,FALSE,0
female,29,0,2,15.2458,C,Third,woman,FALSE,1
female,,0,0,79.2,C,First,woman,TRUE,1
female,30,0,0,86.5,S,First,woman,TRUE,1
female,35,0,0,512.3292,C,First,woman,TRUE,1
female,50,0,1,26,S,Second,woman,FALSE,1
male,,0,0,7.75,Q,Third,man,TRUE,0
male,3,4,2,31.3875,S,Third,child,FALSE,1
male,52,1,1,79.65,S,First,man,FALSE,0
male,40,0,0,0,S,First,man,TRUE,0
female,,0,0,7.75,Q,Third,woman,TRUE,0
male,36,0,0,10.5,S,Second,man,TRUE,0
male,16,4,1,39.6875,S,Third,man,FALSE,0
male,25,1,0,7.775,S,Third,man,FALSE,1
female,58,0,1,153.4625,S,First,woman,FALSE,1
female,35,0,0,135.6333,S,First,woman,TRUE,1
male,,0,0,31,S,First,man,TRUE,0
male,25,0,0,0,S,Third,man,TRUE,1
female,41,0,1,19.5,S,Second,woman,FALSE,1
male,37,0,1,29.7,C,First,man,FALSE,0
female,,0,0,7.75,Q,Third,woman,TRUE,1
female,63,1,0,77.9583,S,First,woman,FALSE,1
female,45,0,0,7.75,S,Third,woman,TRUE,0
male,,0,0,0,S,Second,man,TRUE,0
male,7,4,1,29.125,Q,Third,child,FALSE,0
female,35,1,1,20.25,S,Third,woman,FALSE,1
male,65,0,0,7.75,Q,Third,man,TRUE,0
male,28,0,0,7.8542,S,Third,man,TRUE,0
male,16,0,0,9.5,S,Third,man,TRUE,0
male,19,0,0,8.05,S,Third,man,TRUE,1
male,,0,0,26,S,First,man,TRUE,0
male,33,0,0,8.6625,C,Third,man,TRUE,0
male,30,0,0,9.5,S,Third,man,TRUE,1
male,22,0,0,7.8958,S,Third,man,TRUE,0
male,42,0,0,13,S,Second,man,TRUE,1
female,22,0,0,7.75,Q,Third,woman,TRUE,1
female,26,0,0,78.85,S,First,woman,TRUE,1
female,19,1,0,91.0792,C,First,woman,FALSE,1
male,36,0,0,12.875,C,Second,man,TRUE,0
female,24,0,0,8.85,S,Third,woman,TRUE,0
male,24,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,27.7208,C,First,man,TRUE,0
male,23.5,0,0,7.2292,C,Third,man,TRUE,0
female,2,1,2,151.55,S,First,child,FALSE,0
male,,0,0,30.5,S,First,man,TRUE,1
female,50,0,1,247.5208,C,First,woman,FALSE,1
female,,0,0,7.75,Q,Third,woman,TRUE,1
male,,2,0,23.25,Q,Third,man,FALSE,1
male,19,0,0,0,S,Third,man,TRUE,0
female,,0,0,12.35,Q,Second,woman,TRUE,1
male,,0,0,8.05,S,Third,man,TRUE,0
male,0.92,1,2,151.55,S,First,child,FALSE,1
female,,0,0,110.8833,C,First,woman,TRUE,1
female,17,1,0,108.9,C,First,woman,FALSE,1
male,30,1,0,24,C,Second,man,FALSE,0
female,30,0,0,56.9292,C,First,woman,TRUE,1
female,24,0,0,83.1583,C,First,woman,TRUE,1
female,18,2,2,262.375,C,First,woman,FALSE,1
female,26,1,1,26,S,Second,woman,FALSE,0
male,28,0,0,7.8958,S,Third,man,TRUE,0
male,43,1,1,26.25,S,Second,man,FALSE,0
female,26,0,0,7.8542,S,Third,woman,TRUE,1
female,24,1,0,26,S,Second,woman,FALSE,1
male,54,0,0,14,S,Second,man,TRUE,0
female,31,0,2,164.8667,S,First,woman,FALSE,1
female,40,1,1,134.5,C,First,woman,FALSE,1
male,22,0,0,7.25,S,Third,man,TRUE,0
male,27,0,0,7.8958,S,Third,man,TRUE,0
female,30,0,0,12.35,Q,Second,woman,TRUE,1
female,22,1,1,29,S,Second,woman,FALSE,1
male,,8,2,69.55,S,Third,man,FALSE,0
female,36,0,0,135.6333,C,First,woman,TRUE,1
male,61,0,0,6.2375,S,Third,man,TRUE,0
female,36,0,0,13,S,Second,woman,TRUE,1
female,31,1,1,20.525,S,Third,woman,FALSE,1
female,16,0,1,57.9792,C,First,woman,FALSE,1
female,,2,0,23.25,Q,Third,woman,FALSE,1
male,45.5,0,0,28.5,S,First,man,TRUE,0
male,38,0,1,153.4625,S,First,man,FALSE,0
male,16,2,0,18,S,Third,man,FALSE,0
female,,1,0,133.65,S,First,woman,FALSE,1
male,,0,0,7.8958,S,Third,man,TRUE,0
male,29,1,0,66.6,S,First,man,FALSE,0
female,41,0,0,134.5,C,First,woman,TRUE,1
male,45,0,0,8.05,S,Third,man,TRUE,1
male,45,0,0,35.5,S,First,man,TRUE,0
male,2,1,1,26,S,Second,child,FALSE,1
female,24,3,2,263,S,First,woman,FALSE,1
male,28,0,0,13,S,Second,man,TRUE,0
male,25,0,0,13,S,Second,man,TRUE,0
male,36,0,0,13,S,Second,man,TRUE,0
female,24,0,0,13,S,Second,woman,TRUE,1
female,40,0,0,13,S,Second,woman,TRUE,1
female,,1,0,16.1,S,Third,woman,FALSE,1
male,3,1,1,15.9,S,Third,child,FALSE,1
male,42,0,0,8.6625,S,Third,man,TRUE,0
male,23,0,0,9.225,S,Third,man,TRUE,0
male,,0,0,35,S,First,man,TRUE,0
male,15,1,1,7.2292,C,Third,child,FALSE,0
male,25,1,0,17.8,S,Third,man,FALSE,0
male,,0,0,7.225,C,Third,man,TRUE,0
male,28,0,0,9.5,S,Third,man,TRUE,0
female,22,0,1,55,S,First,woman,FALSE,1
female,38,0,0,13,S,Second,woman,TRUE,0
female,,0,0,7.8792,Q,Third,woman,TRUE,1
female,,0,0,7.8792,Q,Third,woman,TRUE,1
male,40,1,4,27.9,S,Third,man,FALSE,0
male,29,1,0,27.7208,C,Second,man,FALSE,0
female,45,0,1,14.4542,C,Third,woman,FALSE,0
male,35,0,0,7.05,S,Third,man,TRUE,0
male,,1,0,15.5,Q,Third,man,FALSE,0
male,30,0,0,7.25,S,Third,man,TRUE,0
female,60,1,0,75.25,C,First,woman,FALSE,1
female,,0,0,7.2292,C,Third,woman,TRUE,1
female,,0,0,7.75,Q,Third,woman,TRUE,1
female,24,0,0,69.3,C,First,woman,TRUE,1
male,25,1,0,55.4417,C,First,man,FALSE,1
male,18,1,0,6.4958,S,Third,man,FALSE,0
male,19,0,0,8.05,S,Third,man,TRUE,0
male,22,0,0,135.6333,C,First,man,TRUE,0
female,3,3,1,21.075,S,Third,child,FALSE,0
female,,1,0,82.1708,C,First,woman,FALSE,1
female,22,0,0,7.25,S,Third,woman,TRUE,1
male,27,0,2,211.5,C,First,man,FALSE,0
male,20,0,0,4.0125,C,Third,man,TRUE,0
male,19,0,0,7.775,S,Third,man,TRUE,0
female,42,0,0,227.525,C,First,woman,TRUE,1
female,1,0,2,15.7417,C,Third,child,FALSE,1
male,32,0,0,7.925,S,Third,man,TRUE,0
female,35,1,0,52,S,First,woman,FALSE,1
male,,0,0,7.8958,S,Third,man,TRUE,0
male,18,0,0,73.5,S,Second,man,TRUE,0
male,1,5,2,46.9,S,Third,child,FALSE,0
female,36,0,0,13,S,Second,woman,TRUE,1
male,,0,0,7.7292,Q,Third,man,TRUE,0
female,17,0,0,12,C,Second,woman,TRUE,1
male,36,1,2,120,S,First,man,FALSE,1
male,21,0,0,7.7958,S,Third,man,TRUE,1
male,28,2,0,7.925,S,Third,man,FALSE,0
female,23,1,0,113.275,C,First,woman,FALSE,1
female,24,0,2,16.7,S,Third,woman,FALSE,1
male,22,0,0,7.7958,S,Third,man,TRUE,0
female,31,0,0,7.8542,S,Third,woman,TRUE,0
male,46,0,0,26,S,Second,man,TRUE,0
male,23,0,0,10.5,S,Second,man,TRUE,0
female,28,0,0,12.65,S,Second,woman,TRUE,1
male,39,0,0,7.925,S,Third,man,TRUE,1
male,26,0,0,8.05,S,Third,man,TRUE,0
female,21,1,0,9.825,S,Third,woman,FALSE,0
male,28,1,0,15.85,S,Third,man,FALSE,0
female,20,0,0,8.6625,S,Third,woman,TRUE,0
male,34,1,0,21,S,Second,man,FALSE,0
male,51,0,0,7.75,S,Third,man,TRUE,0
male,3,1,1,18.75,S,Second,child,FALSE,1
male,21,0,0,7.775,S,Third,man,TRUE,0
female,,3,1,25.4667,S,Third,woman,FALSE,0
male,,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,6.8583,Q,Third,man,TRUE,0
female,33,1,0,90,Q,First,woman,FALSE,1
male,,0,0,0,S,Second,man,TRUE,0
male,44,0,0,7.925,S,Third,man,TRUE,1
female,,0,0,8.05,S,Third,woman,TRUE,0
female,34,1,1,32.5,S,Second,woman,FALSE,1
female,18,0,2,13,S,Second,woman,FALSE,1
male,30,0,0,13,S,Second,man,TRUE,0
female,10,0,2,24.15,S,Third,child,FALSE,0
male,,0,0,7.8958,C,Third,man,TRUE,0
male,21,0,0,7.7333,Q,Third,man,TRUE,0
male,29,0,0,7.875,S,Third,man,TRUE,0
female,28,1,1,14.4,S,Third,woman,FALSE,0
male,18,1,1,20.2125,S,Third,man,FALSE,0
male,,0,0,7.25,S,Third,man,TRUE,0
female,28,1,0,26,S,Second,woman,FALSE,1
female,19,0,0,26,S,Second,woman,TRUE,1
male,,0,0,7.75,Q,Third,man,TRUE,0
male,32,0,0,8.05,S,Third,man,TRUE,1
male,28,0,0,26.55,S,First,man,TRUE,1
female,,1,0,16.1,S,Third,woman,FALSE,1
female,42,1,0,26,S,Second,woman,FALSE,1
male,17,0,0,7.125,S,Third,man,TRUE,0
male,50,1,0,55.9,S,First,man,FALSE,0
female,14,1,2,120,S,First,child,FALSE,1
female,21,2,2,34.375,S,Third,woman,FALSE,0
female,24,2,3,18.75,S,Second,woman,FALSE,1
male,64,1,4,263,S,First,man,FALSE,0
male,31,0,0,10.5,S,Second,man,TRUE,0
female,45,1,1,26.25,S,Second,woman,FALSE,1
male,20,0,0,9.5,S,Third,man,TRUE,0
male,25,1,0,7.775,S,Third,man,FALSE,0
female,28,0,0,13,S,Second,woman,TRUE,1
male,,0,0,8.1125,S,Third,man,TRUE,1
male,4,0,2,81.8583,S,First,child,FALSE,1
female,13,0,1,19.5,S,Second,child,FALSE,1
male,34,0,0,26.55,S,First,man,TRUE,1
female,5,2,1,19.2583,C,Third,child,FALSE,1
male,52,0,0,30.5,S,First,man,TRUE,1
male,36,1,2,27.75,S,Second,man,FALSE,0
male,,1,0,19.9667,S,Third,man,FALSE,0
male,30,0,0,27.75,C,First,man,TRUE,0
male,49,1,0,89.1042,C,First,man,FALSE,1
male,,0,0,8.05,S,Third,man,TRUE,0
male,29,0,0,7.8958,C,Third,man,TRUE,1
male,65,0,0,26.55,S,First,man,TRUE,0
female,,1,0,51.8625,S,First,woman,FALSE,1
female,50,0,0,10.5,S,Second,woman,TRUE,1
male,,0,0,7.75,Q,Third,man,TRUE,0
male,48,0,0,26.55,S,First,man,TRUE,1
male,34,0,0,8.05,S,Third,man,TRUE,0
male,47,0,0,38.5,S,First,man,TRUE,0
male,48,0,0,13,S,Second,man,TRUE,0
male,,0,0,8.05,S,Third,man,TRUE,0
male,38,0,0,7.05,S,Third,man,TRUE,0
male,,0,0,0,S,Second,man,TRUE,0
male,56,0,0,26.55,S,First,man,TRUE,0
male,,0,0,7.725,Q,Third,man,TRUE,0
female,0.75,2,1,19.2583,C,Third,child,FALSE,1
male,,0,0,7.25,S,Third,man,TRUE,0
male,38,0,0,8.6625,S,Third,man,TRUE,0
female,33,1,2,27.75,S,Second,woman,FALSE,1
female,23,0,0,13.7917,C,Second,woman,TRUE,1
female,22,0,0,9.8375,S,Third,woman,TRUE,0
male,,0,0,52,S,First,man,TRUE,0
male,34,1,0,21,S,Second,man,FALSE,0
male,29,1,0,7.0458,S,Third,man,FALSE,0
male,22,0,0,7.5208,S,Third,man,TRUE,0
female,2,0,1,12.2875,S,Third,child,FALSE,1
male,9,5,2,46.9,S,Third,child,FALSE,0
male,,0,0,0,S,Second,man,TRUE,0
male,50,0,0,8.05,S,Third,man,TRUE,0
female,63,0,0,9.5875,S,Third,woman,TRUE,1
male,25,1,0,91.0792,C,First,man,FALSE,1
female,,3,1,25.4667,S,Third,woman,FALSE,0
female,35,1,0,90,S,First,woman,FALSE,1
male,58,0,0,29.7,C,First,man,TRUE,0
male,30,0,0,8.05,S,Third,man,TRUE,0
male,9,1,1,15.9,S,Third,child,FALSE,1
male,,1,0,19.9667,S,Third,man,FALSE,0
male,21,0,0,7.25,S,Third,man,TRUE,0
male,55,0,0,30.5,S,First,man,TRUE,0
male,71,0,0,49.5042,C,First,man,TRUE,0
male,21,0,0,8.05,S,Third,man,TRUE,0
male,,0,0,14.4583,C,Third,man,TRUE,0
female,54,1,0,78.2667,C,First,woman,FALSE,1
male,,0,0,15.1,S,Third,man,TRUE,0
female,25,1,2,151.55,S,First,woman,FALSE,0
male,24,0,0,7.7958,S,Third,man,TRUE,0
male,17,0,0,8.6625,S,Third,man,TRUE,0
female,21,0,0,7.75,Q,Third,woman,TRUE,0
female,,0,0,7.6292,Q,Third,woman,TRUE,0
female,37,0,0,9.5875,S,Third,woman,TRUE,0
female,16,0,0,86.5,S,First,woman,TRUE,1
male,18,1,0,108.9,C,First,man,FALSE,0
female,33,0,2,26,S,Second,woman,FALSE,1
male,,0,0,26.55,S,First,man,TRUE,1
male,28,0,0,22.525,S,Third,man,TRUE,0
male,26,0,0,56.4958,S,Third,man,TRUE,1
male,29,0,0,7.75,Q,Third,man,TRUE,1
male,,0,0,8.05,S,Third,man,TRUE,0
male,36,0,0,26.2875,S,First,man,TRUE,1
female,54,1,0,59.4,C,First,woman,FALSE,1
male,24,0,0,7.4958,S,Third,man,TRUE,0
male,47,0,0,34.0208,S,First,man,TRUE,0
female,34,0,0,10.5,S,Second,woman,TRUE,1
male,,0,0,24.15,Q,Third,man,TRUE,0
female,36,1,0,26,S,Second,woman,FALSE,1
male,32,0,0,7.8958,S,Third,man,TRUE,0
female,30,0,0,93.5,S,First,woman,TRUE,1
male,22,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,7.225,C,Third,man,TRUE,0
female,44,0,1,57.9792,C,First,woman,FALSE,1
male,,0,0,7.2292,C,Third,man,TRUE,0
male,40.5,0,0,7.75,Q,Third,man,TRUE,0
female,50,0,0,10.5,S,Second,woman,TRUE,1
male,,0,0,221.7792,S,First,man,TRUE,0
male,39,0,0,7.925,S,Third,man,TRUE,0
male,23,2,1,11.5,S,Second,man,FALSE,0
female,2,1,1,26,S,Second,child,FALSE,1
male,,0,0,7.2292,C,Third,man,TRUE,0
male,17,1,1,7.2292,C,Third,man,FALSE,0
female,,0,2,22.3583,C,Third,woman,FALSE,1
female,30,0,0,8.6625,S,Third,woman,TRUE,0
female,7,0,2,26.25,S,Second,child,FALSE,1
male,45,0,0,26.55,S,First,man,TRUE,0
female,30,0,0,106.425,C,First,woman,TRUE,1
male,,0,0,14.5,S,Third,man,TRUE,0
female,22,0,2,49.5,C,First,woman,FALSE,1
female,36,0,2,71,S,First,woman,FALSE,1
female,9,4,2,31.275,S,Third,child,FALSE,0
female,11,4,2,31.275,S,Third,child,FALSE,0
male,32,1,0,26,S,Second,man,FALSE,1
male,50,1,0,106.425,C,First,man,FALSE,0
male,64,0,0,26,S,First,man,TRUE,0
female,19,1,0,26,S,Second,woman,FALSE,1
male,,0,0,13.8625,C,Second,man,TRUE,1
male,33,1,1,20.525,S,Third,man,FALSE,0
male,8,1,1,36.75,S,Second,child,FALSE,1
male,17,0,2,110.8833,C,First,man,FALSE,1
male,27,0,0,26,S,Second,man,TRUE,0
male,,0,0,7.8292,Q,Third,man,TRUE,0
male,22,0,0,7.225,C,Third,man,TRUE,1
female,22,0,0,7.775,S,Third,woman,TRUE,1
male,62,0,0,26.55,S,First,man,TRUE,0
female,48,1,0,39.6,C,First,woman,FALSE,1
male,,0,0,227.525,C,First,man,TRUE,0
female,39,1,1,79.65,S,First,woman,FALSE,1
female,36,1,0,17.4,S,Third,woman,FALSE,1
male,,0,0,7.75,Q,Third,man,TRUE,0
male,40,0,0,7.8958,S,Third,man,TRUE,0
male,28,0,0,13.5,S,Second,man,TRUE,0
male,,0,0,8.05,S,Third,man,TRUE,0
female,,0,0,8.05,S,Third,woman,TRUE,0
male,24,2,0,24.15,S,Third,man,FALSE,0
male,19,0,0,7.8958,S,Third,man,TRUE,0
female,29,0,4,21.075,S,Third,woman,FALSE,0
male,,0,0,7.2292,C,Third,man,TRUE,0
male,32,0,0,7.8542,S,Third,man,TRUE,1
male,62,0,0,10.5,S,Second,man,TRUE,1
female,53,2,0,51.4792,S,First,woman,FALSE,1
male,36,0,0,26.3875,S,First,man,TRUE,1
female,,0,0,7.75,Q,Third,woman,TRUE,1
male,16,0,0,8.05,S,Third,man,TRUE,0
male,19,0,0,14.5,S,Third,man,TRUE,0
female,34,0,0,13,S,Second,woman,TRUE,1
female,39,1,0,55.9,S,First,woman,FALSE,1
female,,1,0,14.4583,C,Third,woman,FALSE,0
male,32,0,0,7.925,S,Third,man,TRUE,1
female,25,1,1,30,S,Second,woman,FALSE,1
female,39,1,1,110.8833,C,First,woman,FALSE,1
male,54,0,0,26,S,Second,man,TRUE,0
male,36,0,0,40.125,C,First,man,TRUE,0
male,,0,0,8.7125,C,Third,man,TRUE,0
female,18,0,2,79.65,S,First,woman,FALSE,1
male,47,0,0,15,S,Second,man,TRUE,0
male,60,1,1,79.2,C,First,man,FALSE,1
male,22,0,0,8.05,S,Third,man,TRUE,0
male,,0,0,8.05,S,Third,man,TRUE,0
male,35,0,0,7.125,S,Third,man,TRUE,0
female,52,1,0,78.2667,C,First,woman,FALSE,1
male,47,0,0,7.25,S,Third,man,TRUE,0
female,,0,2,7.75,Q,Third,woman,FALSE,0
male,37,1,0,26,S,Second,man,FALSE,0
male,36,1,1,24.15,S,Third,man,FALSE,0
female,,0,0,33,S,Second,woman,TRUE,1
male,49,0,0,0,S,Third,man,TRUE,0
male,,0,0,7.225,C,Third,man,TRUE,0
male,49,1,0,56.9292,C,First,man,FALSE,1
female,24,2,1,27,S,Second,woman,FALSE,1
male,,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,42.4,S,First,man,TRUE,0
male,44,0,0,8.05,S,Third,man,TRUE,0
male,35,0,0,26.55,C,First,man,TRUE,1
male,36,1,0,15.55,S,Third,man,FALSE,0
male,30,0,0,7.8958,S,Third,man,TRUE,0
male,27,0,0,30.5,S,First,man,TRUE,1
female,22,1,2,41.5792,C,Second,woman,FALSE,1
female,40,0,0,153.4625,S,First,woman,TRUE,1
female,39,1,5,31.275,S,Third,woman,FALSE,0
male,,0,0,7.05,S,Third,man,TRUE,0
female,,1,0,15.5,Q,Third,woman,FALSE,1
male,,0,0,7.75,Q,Third,man,TRUE,0
male,35,0,0,8.05,S,Third,man,TRUE,0
female,24,1,2,65,S,Second,woman,FALSE,1
male,34,1,1,14.4,S,Third,man,FALSE,0
female,26,1,0,16.1,S,Third,woman,FALSE,0
female,4,2,1,39,S,Second,child,FALSE,1
male,26,0,0,10.5,S,Second,man,TRUE,0
male,27,1,0,14.4542,C,Third,man,FALSE,0
male,42,1,0,52.5542,S,First,man,FALSE,1
male,20,1,1,15.7417,C,Third,man,FALSE,1
male,21,0,0,7.8542,S,Third,man,TRUE,0
male,21,0,0,16.1,S,Third,man,TRUE,0
male,61,0,0,32.3208,S,First,man,TRUE,0
male,57,0,0,12.35,Q,Second,man,TRUE,0
female,21,0,0,77.9583,S,First,woman,TRUE,1
male,26,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,7.7333,Q,Third,man,TRUE,0
male,80,0,0,30,S,First,man,TRUE,1
male,51,0,0,7.0542,S,Third,man,TRUE,0
male,32,0,0,30.5,C,First,man,TRUE,1
male,,0,0,0,S,First,man,TRUE,0
female,9,3,2,27.9,S,Third,child,FALSE,0
female,28,0,0,13,S,Second,woman,TRUE,1
male,32,0,0,7.925,S,Third,man,TRUE,0
male,31,1,1,26.25,S,Second,man,FALSE,0
female,41,0,5,39.6875,S,Third,woman,FALSE,0
male,,1,0,16.1,S,Third,man,FALSE,0
male,20,0,0,7.8542,S,Third,man,TRUE,0
female,24,0,0,69.3,C,First,woman,TRUE,1
female,2,3,2,27.9,S,Third,child,FALSE,0
male,,0,0,56.4958,S,Third,man,TRUE,1
female,0.75,2,1,19.2583,C,Third,child,FALSE,1
male,48,1,0,76.7292,C,First,man,FALSE,1
male,19,0,0,7.8958,S,Third,man,TRUE,0
male,56,0,0,35.5,C,First,man,TRUE,1
male,,0,0,7.55,S,Third,man,TRUE,0
female,23,0,0,7.55,S,Third,woman,TRUE,1
male,,0,0,7.8958,S,Third,man,TRUE,0
female,18,0,1,23,S,Second,woman,FALSE,1
male,21,0,0,8.4333,S,Third,man,TRUE,0
female,,0,0,7.8292,Q,Third,woman,TRUE,1
female,18,0,0,6.75,Q,Third,woman,TRUE,0
male,24,2,0,73.5,S,Second,man,FALSE,0
male,,0,0,7.8958,S,Third,man,TRUE,0
female,32,1,1,15.5,Q,Third,woman,FALSE,0
male,23,0,0,13,S,Second,man,TRUE,0
male,58,0,2,113.275,C,First,man,FALSE,0
male,50,2,0,133.65,S,First,man,FALSE,1
male,40,0,0,7.225,C,Third,man,TRUE,0
male,47,0,0,25.5875,S,First,man,TRUE,0
male,36,0,0,7.4958,S,Third,man,TRUE,0
male,20,1,0,7.925,S,Third,man,FALSE,1
male,32,2,0,73.5,S,Second,man,FALSE,0
male,25,0,0,13,S,Second,man,TRUE,0
male,,0,0,7.775,S,Third,man,TRUE,0
male,43,0,0,8.05,S,Third,man,TRUE,0
female,,1,0,52,S,First,woman,FALSE,1
female,40,1,1,39,S,Second,woman,FALSE,1
male,31,1,0,52,S,First,man,FALSE,0
male,70,0,0,10.5,S,Second,man,TRUE,0
male,31,0,0,13,S,Second,man,TRUE,1
male,,0,0,0,S,Second,man,TRUE,0
male,18,0,0,7.775,S,Third,man,TRUE,0
male,24.5,0,0,8.05,S,Third,man,TRUE,0
female,18,0,0,9.8417,S,Third,woman,TRUE,1
female,43,1,6,46.9,S,Third,woman,FALSE,0
male,36,0,1,512.3292,C,First,man,FALSE,1
female,,0,0,8.1375,Q,Third,woman,TRUE,0
male,27,0,0,76.7292,C,First,man,TRUE,1
male,20,0,0,9.225,S,Third,man,TRUE,0
male,14,5,2,46.9,S,Third,child,FALSE,0
male,60,1,1,39,S,Second,man,FALSE,0
male,25,1,2,41.5792,C,Second,man,FALSE,0
male,14,4,1,39.6875,S,Third,child,FALSE,0
male,19,0,0,10.1708,S,Third,man,TRUE,0
male,18,0,0,7.7958,S,Third,man,TRUE,0
female,15,0,1,211.3375,S,First,child,FALSE,1
male,31,1,0,57,S,First,man,FALSE,1
female,4,0,1,13.4167,C,Third,child,FALSE,1
male,,0,0,56.4958,S,Third,man,TRUE,1
male,25,0,0,7.225,C,Third,man,TRUE,0
male,60,0,0,26.55,S,First,man,TRUE,0
male,52,0,0,13.5,S,Second,man,TRUE,0
male,44,0,0,8.05,S,Third,man,TRUE,0
female,,0,0,7.7333,Q,Third,woman,TRUE,1
male,49,1,1,110.8833,C,First,man,FALSE,0
male,42,0,0,7.65,S,Third,man,TRUE,0
female,18,1,0,227.525,C,First,woman,FALSE,1
male,35,0,0,26.2875,S,First,man,TRUE,1
female,18,0,1,14.4542,C,Third,woman,FALSE,0
male,25,0,0,7.7417,Q,Third,man,TRUE,0
male,26,1,0,7.8542,S,Third,man,FALSE,0
male,39,0,0,26,S,Second,man,TRUE,0
female,45,0,0,13.5,S,Second,woman,TRUE,1
male,42,0,0,26.2875,S,First,man,TRUE,1
female,22,0,0,151.55,S,First,woman,TRUE,1
male,,1,1,15.2458,C,Third,man,FALSE,1
female,24,0,0,49.5042,C,First,woman,TRUE,1
male,,0,0,26.55,S,First,man,TRUE,0
male,48,1,0,52,S,First,man,FALSE,1
male,29,0,0,9.4833,S,Third,man,TRUE,0
male,52,0,0,13,S,Second,man,TRUE,0
male,19,0,0,7.65,S,Third,man,TRUE,0
female,38,0,0,227.525,C,First,woman,TRUE,1
female,27,0,0,10.5,S,Second,woman,TRUE,1
male,,0,0,15.5,Q,Third,man,TRUE,0
male,33,0,0,7.775,S,Third,man,TRUE,0
female,6,0,1,33,S,Second,child,FALSE,1
male,17,1,0,7.0542,S,Third,man,FALSE,0
male,34,0,0,13,S,Second,man,TRUE,0
male,50,0,0,13,S,Second,man,TRUE,0
male,27,1,0,53.1,S,First,man,FALSE,1
male,20,0,0,8.6625,S,Third,man,TRUE,0
female,30,3,0,21,S,Second,woman,FALSE,1
female,,0,0,7.7375,Q,Third,woman,TRUE,1
male,25,1,0,26,S,Second,man,FALSE,0
female,25,1,0,7.925,S,Third,woman,FALSE,0
female,29,0,0,211.3375,S,First,woman,TRUE,1
male,11,0,0,18.7875,C,Third,child,TRUE,0
male,,0,0,0,S,Second,man,TRUE,0
male,23,0,0,13,S,Second,man,TRUE,0
male,23,0,0,13,S,Second,man,TRUE,0
male,28.5,0,0,16.1,S,Third,man,TRUE,0
female,48,1,3,34.375,S,Third,woman,FALSE,0
male,35,0,0,512.3292,C,First,man,TRUE,1
male,,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,30,S,First,man,TRUE,1
male,36,1,0,78.85,S,First,man,FALSE,0
female,21,2,2,262.375,C,First,woman,FALSE,1
male,24,1,0,16.1,S,Third,man,FALSE,0
male,31,0,0,7.925,S,Third,man,TRUE,1
male,70,1,1,71,S,First,man,FALSE,0
male,16,1,1,20.25,S,Third,man,FALSE,0
female,30,0,0,13,S,Second,woman,TRUE,1
male,19,1,0,53.1,S,First,man,FALSE,0
male,31,0,0,7.75,Q,Third,man,TRUE,0
female,4,1,1,23,S,Second,child,FALSE,1
male,6,0,1,12.475,S,Third,child,FALSE,1
male,33,0,0,9.5,S,Third,man,TRUE,0
male,23,0,0,7.8958,S,Third,man,TRUE,0
female,48,1,2,65,S,Second,woman,FALSE,1
male,0.67,1,1,14.5,S,Second,child,FALSE,1
male,28,0,0,7.7958,S,Third,man,TRUE,0
male,18,0,0,11.5,S,Second,man,TRUE,0
male,34,0,0,8.05,S,Third,man,TRUE,0
female,33,0,0,86.5,S,First,woman,TRUE,1
male,,0,0,14.5,S,Third,man,TRUE,0
male,41,0,0,7.125,S,Third,man,TRUE,0
male,20,0,0,7.2292,C,Third,man,TRUE,1
female,36,1,2,120,S,First,woman,FALSE,1
male,16,0,0,7.775,S,Third,man,TRUE,0
female,51,1,0,77.9583,S,First,woman,FALSE,1
male,,0,0,39.6,C,First,man,TRUE,0
female,30.5,0,0,7.75,Q,Third,woman,TRUE,0
male,,1,0,24.15,Q,Third,man,FALSE,0
male,32,0,0,8.3625,S,Third,man,TRUE,0
male,24,0,0,9.5,S,Third,man,TRUE,0
male,48,0,0,7.8542,S,Third,man,TRUE,0
female,57,0,0,10.5,S,Second,woman,TRUE,0
male,,0,0,7.225,C,Third,man,TRUE,0
female,54,1,3,23,S,Second,woman,FALSE,1
male,18,0,0,7.75,S,Third,man,TRUE,0
male,,0,0,7.75,Q,Third,man,TRUE,0
female,5,0,0,12.475,S,Third,child,TRUE,1
male,,0,0,7.7375,Q,Third,man,TRUE,0
female,43,0,1,211.3375,S,First,woman,FALSE,1
female,13,0,0,7.2292,C,Third,child,TRUE,1
female,17,1,0,57,S,First,woman,FALSE,1
male,29,0,0,30,S,First,man,TRUE,0
male,,1,2,23.45,S,Third,man,FALSE,0
male,25,0,0,7.05,S,Third,man,TRUE,0
male,25,0,0,7.25,S,Third,man,TRUE,0
female,18,0,0,7.4958,S,Third,woman,TRUE,1
male,8,4,1,29.125,Q,Third,child,FALSE,0
male,1,1,2,20.575,S,Third,child,FALSE,1
male,46,0,0,79.2,C,First,man,TRUE,0
male,,0,0,7.75,Q,Third,man,TRUE,0
male,16,0,0,26,S,Second,man,TRUE,0
female,,8,2,69.55,S,Third,woman,FALSE,0
male,,0,0,30.6958,C,First,man,TRUE,0
male,25,0,0,7.8958,S,Third,man,TRUE,0
male,39,0,0,13,S,Second,man,TRUE,0
female,49,0,0,25.9292,S,First,woman,TRUE,1
female,31,0,0,8.6833,S,Third,woman,TRUE,1
male,30,0,0,7.2292,C,Third,man,TRUE,0
female,30,1,1,24.15,S,Third,woman,FALSE,0
male,34,0,0,13,S,Second,man,TRUE,0
female,31,1,1,26.25,S,Second,woman,FALSE,1
male,11,1,2,120,S,First,child,FALSE,1
male,0.42,0,1,8.5167,C,Third,child,FALSE,1
male,27,0,0,6.975,S,Third,man,TRUE,1
male,31,0,0,7.775,S,Third,man,TRUE,0
male,39,0,0,0,S,First,man,TRUE,0
female,18,0,0,7.775,S,Third,woman,TRUE,0
male,39,0,0,13,S,Second,man,TRUE,0
female,33,1,0,53.1,S,First,woman,FALSE,1
male,26,0,0,7.8875,S,Third,man,TRUE,0
male,39,0,0,24.15,S,Third,man,TRUE,0
male,35,0,0,10.5,S,Second,man,TRUE,0
female,6,4,2,31.275,S,Third,child,FALSE,0
male,30.5,0,0,8.05,S,Third,man,TRUE,0
male,,0,0,0,S,First,man,TRUE,0
female,23,0,0,7.925,S,Third,woman,TRUE,0
male,31,1,1,37.0042,C,Second,man,FALSE,0
male,43,0,0,6.45,S,Third,man,TRUE,0
male,10,3,2,27.9,S,Third,child,FALSE,0
female,52,1,1,93.5,S,First,woman,FALSE,1
male,27,0,0,8.6625,S,Third,man,TRUE,1
male,38,0,0,0,S,First,man,TRUE,0
female,27,0,1,12.475,S,Third,woman,FALSE,1
male,2,4,1,39.6875,S,Third,child,FALSE,0
male,,0,0,6.95,Q,Third,man,TRUE,0
male,,0,0,56.4958,S,Third,man,TRUE,0
male,1,0,2,37.0042,C,Second,child,FALSE,1
male,,0,0,7.75,Q,Third,man,TRUE,1
female,62,0,0,80,,First,woman,TRUE,1
female,15,1,0,14.4542,C,Third,child,FALSE,1
male,0.83,1,1,18.75,S,Second,child,FALSE,1
male,,0,0,7.2292,C,Third,man,TRUE,0
male,23,0,0,7.8542,S,Third,man,TRUE,0
male,18,0,0,8.3,S,Third,man,TRUE,0
female,39,1,1,83.1583,C,First,woman,FALSE,1
male,21,0,0,8.6625,S,Third,man,TRUE,0
male,,0,0,8.05,S,Third,man,TRUE,0
male,32,0,0,56.4958,S,Third,man,TRUE,1
male,,0,0,29.7,C,First,man,TRUE,1
male,20,0,0,7.925,S,Third,man,TRUE,0
male,16,0,0,10.5,S,Second,man,TRUE,0
female,30,0,0,31,C,First,woman,TRUE,1
male,34.5,0,0,6.4375,C,Third,man,TRUE,0
male,17,0,0,8.6625,S,Third,man,TRUE,0
male,42,0,0,7.55,S,Third,man,TRUE,0
male,,8,2,69.55,S,Third,man,FALSE,0
male,35,0,0,7.8958,C,Third,man,TRUE,0
male,28,0,1,33,S,Second,man,FALSE,0
female,,1,0,89.1042,C,First,woman,FALSE,1
male,4,4,2,31.275,S,Third,child,FALSE,0
male,74,0,0,7.775,S,Third,man,TRUE,0
female,9,1,1,15.2458,C,Third,child,FALSE,0
female,16,0,1,39.4,S,First,woman,FALSE,1
female,44,1,0,26,S,Second,woman,FALSE,0
female,18,0,1,9.35,S,Third,woman,FALSE,1
female,45,1,1,164.8667,S,First,woman,FALSE,1
male,51,0,0,26.55,S,First,man,TRUE,1
female,24,0,3,19.2583,C,Third,woman,FALSE,1
male,,0,0,7.2292,C,Third,man,TRUE,0
male,41,2,0,14.1083,S,Third,man,FALSE,0
male,21,1,0,11.5,S,Second,man,FALSE,0
female,48,0,0,25.9292,S,First,woman,TRUE,1
female,,8,2,69.55,S,Third,woman,FALSE,0
male,24,0,0,13,S,Second,man,TRUE,0
female,42,0,0,13,S,Second,woman,TRUE,1
female,27,1,0,13.8583,C,Second,woman,FALSE,1
male,31,0,0,50.4958,S,First,man,TRUE,0
male,,0,0,9.5,S,Third,man,TRUE,0
male,4,1,1,11.1333,S,Third,child,FALSE,1
male,26,0,0,7.8958,S,Third,man,TRUE,0
female,47,1,1,52.5542,S,First,woman,FALSE,1
male,33,0,0,5,S,First,man,TRUE,0
male,47,0,0,9,S,Third,man,TRUE,0
female,28,1,0,24,C,Second,woman,FALSE,1
female,15,0,0,7.225,C,Third,child,TRUE,1
male,20,0,0,9.8458,S,Third,man,TRUE,0
male,19,0,0,7.8958,S,Third,man,TRUE,0
male,,0,0,7.8958,S,Third,man,TRUE,0
female,56,0,1,83.1583,C,First,woman,FALSE,1
female,25,0,1,26,S,Second,woman,FALSE,1
male,33,0,0,7.8958,S,Third,man,TRUE,0
female,22,0,0,10.5167,S,Third,woman,TRUE,0
male,28,0,0,10.5,S,Second,man,TRUE,0
male,25,0,0,7.05,S,Third,man,TRUE,0
female,39,0,5,29.125,Q,Third,woman,FALSE,0
male,27,0,0,13,S,Second,man,TRUE,0
female,19,0,0,30,S,First,woman,TRUE,1
female,,1,2,23.45,S,Third,woman,FALSE,0
male,26,0,0,30,C,First,man,TRUE,1
male,32,0,0,7.75,Q,Third,man,TRUE,0
`;

let titanic = [];
const header = ["sex","age","sibsp","parch","fare","embarked","class","who","alone","survived"];

export default function Home() {
  const { t, i18n } = useTranslation();
  const [maleFemaleSurvivalRatioData, setMaleFemaleSurvivalRatioData] = useState([]);
  const [maleFemaleSurvivalRatioDataPercent, setMaleFemaleSurvivalRatioDataPercent] = useState([]);
  const [chartToShow, setChartToShow] = useState("port");

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value); 
  };

  const percent_of_died_embarked = (emb, data) => {
    let cnt = 0;
    let tot = 0;
    data.forEach((obj) => {
      cnt += obj["_5"] === emb && obj["_9"] === "0";
      tot += obj["_5"] === emb;
    });
    return Math.floor(100 * cnt / tot);
  };

  const percent_of_died_class = (cls, data) => {
    let cnt = 0;
    let tot = 0;
    data.forEach((obj) => {
      cnt += obj["_6"] === cls && obj["_9"] === "0";
      tot += obj["_6"] === cls;
    });
    return Math.floor(100 * cnt / tot);
  };
  
  const number_of_males = (data) => {
    let cnt = 0;
    data.forEach((obj) => {
      cnt += obj["_0"] === "male";
    });
    return cnt;
  };

  const number_of_females = (data) => {
    let cnt = 0;
    data.forEach((obj) => {
      cnt += obj["_0"] === "female";
    });
    return cnt;
  };

  const number_of_males_that_survived = (data) => {
    let cnt = 0;
    data.forEach((obj) => {
      cnt += obj["_0"] === "male" && obj["_9"] === "1";
    });
    return cnt;
  };

  const number_of_females_that_survived = (data) => {
    let cnt = 0;
    data.forEach((obj) => {
      cnt += obj["_0"] === "female" && obj["_9"] === "1";
    });
    return cnt;
  };

  const renderActiveShape = (props) => {
    const {
      cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, percent,
    } = props;

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <text
          x={cx}
          y={cy}
          dy={24}
          textAnchor="middle"
          fill="#333"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };


  /// Parse the titanic data.
  useEffect(() => {
    titanic = [];
    Readable.from([titanic_csv])
      .pipe(csv())
      .on("data", (data) => {
         if (Object.values(data).every(v => v !== "")) {
           titanic.push(data);
         }
      })
      .on("end", () => {
        setMaleFemaleSurvivalRatioData([
          {
            name: t("male"),
            survived: number_of_males_that_survived(titanic),
            died: number_of_males(titanic) - number_of_males_that_survived(titanic),
          },

          {
            name: t("female"),
            survived: number_of_females_that_survived(titanic),
            died: number_of_females(titanic) - number_of_females_that_survived(titanic)
          },
        ]);

        setMaleFemaleSurvivalRatioDataPercent([
          {
            name: t("male"),
            died: Math.floor((number_of_males(titanic) - number_of_males_that_survived(titanic)) * 100 / number_of_males(titanic)),
          },

          {
            name: t("female"),
            died: Math.floor((number_of_females(titanic) - number_of_females_that_survived(titanic)) * 100 / number_of_females(titanic))
          },
        ]);

      })
  }, [i18n.language]);

  const handleChartSelect = (e) => {
    setChartToShow(e.target.value);
  };

  return (
    <>
      <nav className="d-flex align-items-center justify-content-between p-3 border-bottom">
        <span className={`${css.delius} fs-3`}> Dash </span>
        
        <div className="d-flex gap-3 align-items-center">
          <label htmlFor="lang-select" className={`text-nowrap ${css.delius}`}>{ t('changeLanguage') }: </label>
          <select id="lang-select" className={`form-select ${css.delius}`} onChange={handleLanguageChange}>
            <option value="en"> English </option>
            <option value="fr"> Français </option>
          </select>
        </div>
      </nav>

      <h1 className={`text-center mt-4 ${css.delius}`}> { t("context") } </h1>
      <hr />

      <h6 className={`text-center mt-4 ${css.delius}`}> { t("overview") } </h6>
{ titanic.length > 0 && (
    <div className="table-responsive"
         style={{ maxHeight: "30vh", overflowY: "auto" }}
    >
      <table className="table table-bordered table-hover h-25">
        <thead className="table-light">
          <tr>
            {header.map((h) => ( <th key={h}>{t(h)}</th> ))}
          </tr>
        </thead>
    
        <tbody>
          {titanic.map((row, i) => (
            <tr key={i}>
              <td>{ t(row["_0"]) } </td>
              <td>{ t(row["_1"]) } </td>
              <td>{ t(row["_2"]) } </td>
              <td>{ t(row["_3"]) } </td>
              <td>{ t(row["_4"]) } </td>
              <td>{ t(row["_5"]) } </td>
              <td>{ t(row["_6"]) } </td>
              <td>{ t(row["_7"]) } </td>
              <td>{ t(row["_8"]) } </td>
              <td>{ t(row["_9"]) } </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
)}
      
      
      <hr />
      <h6 className={`text-center mt-4 ${css.delius}`}> { t("analytics") } </h6>
      <hr />

      <div className="container w-100 h-100 d-flex gap-5 flex-wrap justify-content-between">
        <div className="w-25 h-25 d-flex flex-column align-items-center p-2">

          <h5> { t("chart1") } </h5>

          <MaleFemaleSurvivalRatio data={maleFemaleSurvivalRatioData} t={t} />
        </div>
        
        <div className="w-25 h-25 d-flex flex-column align-items-center p-2">
          <h5> { t("chart2" ) } </h5>
          <MaleFemaleSurvivalRatioPercentage data={maleFemaleSurvivalRatioDataPercent} t={t} />
        </div>

<div className="d-flex flex-column align-items-center p-2 w-100 h-100">

        <div className="d-flex gap-3 align-items-center mb-5">
          <label htmlFor="lang-select" className={`text-nowrap ${css.delius}`}>{ t('chartSelect') }: </label>
          <select id="lang-select" className={`form-select ${css.delius}`} onChange={handleChartSelect}>
            <option value="port"> { t("ByPort") } </option>
            <option value="class"> { t("ByClass") } </option>
          </select>
        </div>

{ chartToShow === "port" && (
        <div className="w-25 h-25 d-flex flex-column align-items-center">
          <h5> { t("chart3" ) } </h5>
          <ResponsiveContainer
            height="100%"
            width="100%"
          >
            <PieChart
              height="100%"
              width="100%"
            >
              <Pie
                activeShape={renderActiveShape}
                data={[
                  {
                    name: 'Port S',
                    value: percent_of_died_embarked("S", titanic)
                  },
                  {
                    name: 'Port C',
                    value: percent_of_died_embarked("C", titanic)
                  },
                  {
                    name: 'Port Q',
                    value: percent_of_died_embarked("Q", titanic)
                  },
                ]}
                fill="#8884d8"
                innerRadius={60}
                outerRadius={80}
                activeIndex={2}
              >
              <Tooltip
                content={function vG(){}}
                defaultIndex={2}
              />
                <Cell key={1} fill="#8884d8" />
                <Cell key={2} fill="#8884d8" />
                <Cell key={3} fill="red" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
)}

{ chartToShow === "class" && (
        <div className="w-25 h-25 d-flex flex-column align-items-center">
          <h5> { t("chart4" ) } </h5>
          <ResponsiveContainer
            height="100%"
            width="100%"
          >
            <PieChart
              height="100%"
              width="100%"
            >
              <Pie
                activeShape={renderActiveShape}
                data={[
                  {
                    name: `${t("First")} ${t("class")}` ,
                    value: percent_of_died_class("First", titanic)
                  },
                  {
                    name: `${t("Second")} ${t("class")}` ,
                    value: percent_of_died_class("Second", titanic)
                  },
                  {
                    name: `${t("Third")} ${t("class")}` ,
                    value: percent_of_died_class("Third", titanic)
                  },
                ]}
                fill="#8884d8"
                innerRadius={60}
                outerRadius={80}
                activeIndex={2}
              >
                <Cell key={1} fill="#8884d8" />
                <Cell key={2} fill="#8884d8" />
                <Cell key={3} fill="red" />
              </Pie>
              <Tooltip
                content={function vG(){}}
                defaultIndex={2}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
)}
</div>
      </div>

    </>
  );
}

/// tasks:
/// - show the number of poeple that died based on gender.
