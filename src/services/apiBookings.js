import MAGIC_NUMBER_PAGE_SIZE from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import PropTypes from "prop-types";

//fetch bookings
export async function getBookings({ filter, sort, page }) {
  //making the custom query for gettting filter and sort values
  let query = supabase
    .from("bookings")
    .select("*, cabins(*) , guests(*)", { count: "exact" }); //,
  //count gives us the number of data so we use in pagination
  //is select me cabin or gust se unka bi pura data nikal sakte hai jbki vo alag tables hai db me star point hai ye for react and supabase query
  //one method to get all filter bookings by status or price are
  //.eq("status", "unconfirmed") or any other status
  //.gte("totalPrice", "any number jise filter krna hai") but we use another method

  //fetch filter data baesd upon prop
  if (filter) query = query.eq(filter.field, filter.value); //also we set eq or any method dynamiclyy to get another type of data

  //sort
  if (sort)
    query = query.order(sort.field, { ascending: sort.direction === "asc" });

  //pagination logic
  if (page) {
    const from = (page - 1) * MAGIC_NUMBER_PAGE_SIZE;
    const to = from + MAGIC_NUMBER_PAGE_SIZE - 1; // 9 is the limit per page, you can change this as per your requirement. 10 is just a sample value.
    query = query.range(from, to);
  }



  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Could not fetch bookings data");
  }

  return { data, count };
}

//getting booking details
export async function getBooking(id) {
  const { data : booking, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();//return single object

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return booking;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));
    //gte = greater than equal 
    //lte = less than equal

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today activity
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}



//update booking
export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

getBookings.propTypes = {
  filter: PropTypes.object,
  sort: PropTypes.object,
  count: PropTypes.number,
};
