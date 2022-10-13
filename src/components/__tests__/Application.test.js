import React from "react";
import axios from "axios";

import { render, cleanup, getByText, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe('Application', () => {


  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"))
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));


    expect(getByText(appointment, "saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));


    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))


    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"))
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"))
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "saving")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"))
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // render application
    const { container, debug } = render(<Application />);
    // wait for element and the finds the appointment for Archie Cohen 
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // click edit
    fireEvent.click(getByAltText(appointment, "Edit"))
    //change student number 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Travis" }
    });
    //click save
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Travis"));
    //check that spot has not changed
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug();
  });
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    // wait for element and the finds the appointment for Archie Cohen 
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"))
    //change student number 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Travis" }
    });
    //click save
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => getByText(appointment, "error saving"));
    expect(getByText(appointment, "error saving")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"))
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Travis" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    await waitForElement(() => getByText(appointment, "Travis"));
    //check that spot has not changed
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // render application
    const { container, debug } = render(<Application />);
    // wait for element and the finds the appointment for Archie Cohen 
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    // click edit
    fireEvent.click(getByAltText(appointment, "Edit"))
    //change student number 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Travis" }
    });
    //click save
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Travis"));
    //check that spot has not changed
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    debug();
  });
  it("shows the save error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    // wait for element and the finds the appointment for Archie Cohen 
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"))

    await waitForElement(() => getByText(appointment, "error deleting"));
    expect(getByText(appointment, "error deleting")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"))

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"))

    await waitForElement(() => getByAltText(appointment, "Add"))
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    debug();
  });

});