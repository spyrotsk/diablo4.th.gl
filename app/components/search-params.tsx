"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useOverwolfRouter } from "../(overwolf)/components/overwolf-router";
import { useUpdateSearchParams } from "../lib/search-params";
import { ALL_FILTERS, useSettingsStore } from "../lib/storage";
import useFilters from "./use-filters";

export default function SearchParams() {
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();
  const router = useOverwolfRouter();
  const [filters] = useFilters();
  const code = searchParams.get("code");
  const filtersParam = searchParams.get("filters");
  const settings = useSettingsStore();

  useEffect(() => {
    if (filters.join(",") === filtersParam) {
      return;
    }

    if (!("update" in router)) {
      let filtersString = "";
      if (filters.length === 0) {
        filtersString = "none";
      } else if (filters.length !== ALL_FILTERS.length) {
        filtersString = filters.join(",");
      }
      updateSearchParams("filters", filtersString);
    }
  }, [filters, filtersParam]);

  useEffect(() => {
    if (!code) {
      return;
    }
    updateSearchParams(["code", "state"], ["", ""]);
    fetch("https://diablo4.th.gl/api/patreon", {
      method: "POST",
      body: JSON.stringify({ code, redirectURI: "https://diablo4.th.gl" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          settings.setIsPatron(true);
        } else {
          console.log(res);
          alert(res.error ?? "Something went wrong, please try again.");
          settings.setIsPatron(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err?.message || "Something went wrong, please try again.");
      });
  }, [code]);

  useEffect(() => {
    if (settings.isPatron) {
      fetch("https://diablo4.th.gl/api/patreon", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            settings.setIsPatron(true);
          } else {
            console.log(res);
            settings.setIsPatron(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return <></>;
}
