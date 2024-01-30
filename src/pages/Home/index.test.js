import { fireEvent, render, screen } from "@testing-library/react"
import Home from "./index"
import events from "../../../public/events.json"

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />)
    await screen.findByText("Email")
    await screen.findByText("Nom")
    await screen.findByText("Prénom")
    await screen.findByText("Personel / Entreprise")
  })

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />)
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      )
      await screen.findByText("En cours")
      await screen.findByText("Message envoyé !")
    })
  })
})

const data = [
  {
    name: "Samira",
    position: "CEO",
  },
  {
    name: "Jean-baptiste",
    position: "Directeur marketing",
  },
  {
    name: "Alice",
    position: "CXO",
  },
  {
    name: "Luís",
    position: "Animateur",
  },
  {
    name: "Christine",
    position: "VP animation",
  },
  {
    name: "Isabelle",
    position: "VP communication",
  },
]

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />)
    expect(screen.getByTestId("event-list")).toBeInTheDocument()
  })
  it("a list a people is displayed", () => {
    render(<Home />)
    const peopleCardElement = screen.getAllByTestId("people-card")
    expect(peopleCardElement.length).toBe(data.length)
    data.forEach((person) => {
      const name = screen.getByText(person.name)
      const position = screen.getByText(person.position)
      expect(name).toBeInTheDocument()
      expect(position).toBeInTheDocument()
    })
  })
  it("a footer is displayed", () => {
    render(<Home />)
    expect(screen.getByTestId("footer")).toBeInTheDocument()
  })
  it("an event card, with the last event, is displayed", () => {
    render(<Home />)
    expect(events.events[events.events.length - 1].id).toBe(18)
    expect(events.events[events.events.length - 1].date).toBe(
      "2022-04-29T20:28:45.744Z"
    )
  })
})
