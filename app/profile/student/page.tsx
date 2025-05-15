"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Save, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: "Juan Pérez",
    email: "juan.perez@udp.cl",
    bio: "Estudiante de Ingeniería Civil en la Universidad Diego Portales. Interesado en matemáticas, física y programación.",
    university: "Universidad Diego Portales",
    degree: "Ingeniería Civil",
    year: "2do año",
  })

  const [interests, setInterests] = useState([
    { id: 1, name: "Matemáticas" },
    { id: 2, name: "Física" },
    { id: 3, name: "Programación" },
  ])

  const [newInterest, setNewInterest] = useState("")

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewInterest(e.target.value)
  }

  const addInterest = () => {
    if (newInterest) {
      setInterests([...interests, { id: interests.length + 1, name: newInterest }])
      setNewInterest("")
    }
  }

  const removeInterest = (id: number) => {
    setInterests(interests.filter((interest) => interest.id !== id))
  }

  const saveProfile = () => {
    console.log("Perfil guardado:", { profile, interests })
    // Aquí iría la lógica para guardar en la base de datos
  }

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center">
        <Link href="/dashboard/student" className="mr-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-sky-700">Mi Perfil de Estudiante</h1>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                  <AvatarFallback className="text-2xl">JP</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <CardTitle>{profile.name}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sky-700">Universidad</h3>
                  <p className="text-sm text-muted-foreground">{profile.university}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sky-700">Carrera</h3>
                  <p className="text-sm text-muted-foreground">{profile.degree}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sky-700">Año</h3>
                  <p className="text-sm text-muted-foreground">{profile.year}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button variant="outline" className="w-full" onClick={saveProfile}>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
              <Link href="/profile/convert-to-tutor" className="w-full">
                <Button className="w-full bg-sky-600 hover:bg-sky-700">Convertirme en tutor</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs defaultValue="info">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="interests">Intereses</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tu información personal y académica</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" name="name" value={profile.name} onChange={handleProfileChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      disabled
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea id="bio" name="bio" value={profile.bio} onChange={handleProfileChange} rows={4} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="university">Universidad</Label>
                    <Input
                      id="university"
                      name="university"
                      value={profile.university}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="degree">Carrera</Label>
                    <Input id="degree" name="degree" value={profile.degree} onChange={handleProfileChange} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Año</Label>
                    <Input id="year" name="year" value={profile.year} onChange={handleProfileChange} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="interests" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Áreas de interés</CardTitle>
                  <CardDescription>Agrega las materias en las que estás buscando ayuda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <Badge key={interest.id} className="flex items-center gap-1 bg-sky-100 text-sky-800">
                        {interest.name}
                        <button
                          onClick={() => removeInterest(interest.id)}
                          className="ml-1 rounded-full p-0.5 hover:bg-sky-200"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Eliminar</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Agregar nueva área de interés"
                      value={newInterest}
                      onChange={handleNewInterestChange}
                      onKeyDown={(e) => e.key === "Enter" && addInterest()}
                    />
                    <Button type="button" onClick={addInterest} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
