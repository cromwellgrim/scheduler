import React from "react";

import {
	render,
	cleanup,
	getByText,
	waitForElement,
	fireEvent,
	prettyDOM,
	getAllByTestId,
	getByAltText,
	getByPlaceholderText,
	queryByText,
	wait,
	queryByAltText,
	getByDisplayValue,
} from "@testing-library/react";
import axios from "__mocks__/axios";
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
	/*-------------------------------------------------------------*/

	it("defaults to Monday and changes the schedule when a new day is selected", async () => {
		const { getByText } = render(<Application />);

		await waitForElement(() => getByText("Monday"));
		fireEvent.click(getByText("Tuesday"));
		expect(getByText("Leopold Silvers")).toBeInTheDocument();
	});

	/*-------------------------------------------------------------*/

	it("loads data, books an interview, and reduces the spots remaining for the first day by 1", async () => {
		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointments = getAllByTestId(container, "appointment");

		const appointment = appointments[0];

		fireEvent.click(getByAltText(appointment, "Add"));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Lydia Miller-Jones" },
		});

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday"),
		);

		expect(getByText(day, "no spots remaining")).toBeInTheDocument();
	});

	/*-------------------------------------------------------------*/

	it("loads data, cancels an interview, and increases the spots remaining on the first day by 1", async () => {
		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(
			container,
			"appointment",
		).find((appointment) => queryByText(appointment, "Archie Cohen"));

		fireEvent.click(queryByAltText(appointment, "Delete"));

		expect(
			getByText(
				appointment,
				"Are you sure you want to cancel your appointment?",
			),
		).toBeInTheDocument();

		fireEvent.click(getByText(appointment, "Confirm"));

		expect(getByText(appointment, "Deleting")).toBeInTheDocument();

		await waitForElement(() => getByAltText(appointment, "Add"));

		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday"),
		);

		expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
	});

	/*-------------------------------------------------------------*/

	it("loads data, edits an interview, and keeps the spots remaining for Monday the same", async () => {
		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(
			container,
			"appointment",
		).find((appointment) => queryByText(appointment, "Archie Cohen"));

		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday"),
		);

		fireEvent.click(queryByAltText(appointment, "Edit"));

		fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
			target: { value: "Polkadot Patterson" },
		});

		await waitForElement(() =>
			getByDisplayValue(container, "Polkadot Patterson"),
		);

		fireEvent.click(getByText(appointment, "Save"));

		expect(getByText(appointment, "Saving")).toBeInTheDocument();

		await waitForElement(() => getByText(appointment, "Polkadot Patterson"));
		
		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	/*-------------------------------------------------------------*/

	it("shows the save error when failing to save an appointment", async () => {
		axios.put.mockRejectedValueOnce();

		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(
			container,
			"appointment",
		).find((appointment) => queryByText(appointment, "Archie Cohen"));

		fireEvent.click(getByAltText(appointment, "Edit"));

		fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
			target: { value: "Polkadot Patterson" },
		});

		fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

		fireEvent.click(getByText(appointment, "Save"));

		await waitForElement(() => queryByText(container, "Error"));

		fireEvent.click(getByAltText(appointment, "Close"));

		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday"),
		);

		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});

	/*-------------------------------------------------------------*/

	it("shows the delete error when failing to cancel an appointment", async () => {
		axios.delete.mockRejectedValueOnce();

		const { container, debug } = render(<Application />);

		await waitForElement(() => getByText(container, "Archie Cohen"));

		const appointment = getAllByTestId(
			container,
			"appointment",
		).find((appointment) => queryByText(appointment, "Archie Cohen"));

		fireEvent.click(queryByAltText(appointment, "Delete"));

		expect(
			getByText(
				appointment,
				"Are you sure you want to cancel your appointment?",
			),
		).toBeInTheDocument();

		fireEvent.click(getByText(appointment, "Confirm"));

		await waitForElement(() => queryByText(container, "Error"));

		fireEvent.click(getByAltText(appointment, "Close"));

		expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

		const day = getAllByTestId(container, "day").find((day) =>
			queryByText(day, "Monday"),
		);

		expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
	});
});
