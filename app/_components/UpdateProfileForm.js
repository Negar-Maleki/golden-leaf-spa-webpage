"use client";

import { useEffect, useState } from "react";
import { updateGuest } from "../_lib/actions";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useFormState } from "react-dom";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ guest }) {
  const [values, setValues] = useState({
    name: guest.name ?? "",
    email: guest.email ?? "",
    phone: guest.phone ?? "",
    notes: guest.notes ?? "",
  });

  return (
    <form
      className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      action={updateGuest}
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="name"
          defaultValue={guest.name}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={guest.email}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>
      <div className="space-y-2">
        <div className="flex flex-col  gap-2">
          <label htmlFor="phone">Phone number</label>
          <PhoneInput
            name="phone"
            defaultCountry="gb"
            value={values.phone}
            onChange={(phone) => setValues((prev) => ({ ...prev, phone }))}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="notes">Your preference</label>
        <textarea
          placeholder="Please tell us about what do you prefer"
          name="notes"
          value={values.notes}
          onChange={(event) =>
            setValues((prev) => ({ ...prev, notes: event.target.value }))
          }
          className="px-5 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          rows={2}
        />
      </div>
      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
