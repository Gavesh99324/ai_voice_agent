"use client";

import React, { useEffect, useState, useContext } from 'react';
import { supabase } from '@/services/supabaseClient';
import { UserDetailContext } from '@/context/UserDetailContext';

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      await createNewUser();
    };
    init();
  }, []);

  const createNewUser = async () => {
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Error getting authenticated user:", authError);
        return;
      }

      if (!authUser) {
        console.warn("No authenticated user found.");
        return;
      }

      const { data: Users, error: fetchError } = await supabase
        .from('Users')
        .select("*")
        .eq('email', authUser.email);

      if (fetchError) {
        console.error("Error fetching user from DB:", fetchError);
        return;
      }

      if (!Users || Users.length === 0) {
        const { data: insertedData, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: authUser.user_metadata?.name || '',
              email: authUser.email,
              picture: authUser.user_metadata?.picture || '',
            }
          ])
          .select();

        if (insertError) {
          console.error("Error inserting new user:", insertError);
          return;
        }

        setUser(insertedData?.[0] || null);
      } else {
        setUser(Users[0]);
      }
    } catch (err) {
      console.error("Unexpected error in createNewUser:", err);
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used within a Provider");
  }
  return context;
};


