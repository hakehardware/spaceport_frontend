'use client'
import React, { useEffect, useState } from 'react'
import { Farm } from '../types'
import {
    Card,
    Heading,
    Table,
    Flex,
    Badge,
    Text,
    Progress,
} from '@radix-ui/themes'
import EntityIcon from '../components/EntityIcon'
import PlotProgress from '../components/PlotProgress'

const FARMS_URL = 'http://192.168.69.12:9998/get/farms?sort_column=farm_index'

const Farms = () => {
    const [farms, setFarms] = useState<Farm[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const response = await fetch(FARMS_URL)
                if (!response.ok) {
                    throw new Error('Error fetching farms')
                }
                const data = await response.json()
                setFarms(data.data)
            } catch (error: any) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchContainers()
    }, [])

    return (
        <Card>
            <Heading size="4" mb="5">
                Farmers
            </Heading>
            <Table.Root>
                <Table.Body>
                    {farms.map((farm) => (
                        <Table.Row key={`${farm.farm_index}_${farm.farmer_id}`}>
                            <Table.Cell>
                                <Flex align="center" gap="5">
                                    <EntityIcon entity="farm" />
                                    <Flex
                                        direction="column"
                                        gap="2"
                                        width="100%"
                                    >
                                        <Flex
                                            className="md:col-span-3"
                                            align="center"
                                            gap="5"
                                        >
                                            <Text weight="bold">
                                                {farm.farmer_id} - Farm{' '}
                                                {farm.farm_index} [{farm.farm_size}]
                                            </Text>
                                        </Flex>
                                        {farm.farm_plot_progress < 100 &&
                                            farm.farm_initial_plot_complete ===
                                                1 && <Text>Replotting</Text>}
                                        {farm.farm_plot_progress < 100 &&
                                            farm.farm_initial_plot_complete ===
                                                0 && <Text>Plotting</Text>}
                                        {farm.farm_plot_progress === 100 && (
                                            <Text>Plotting Complete</Text>
                                        )}
                                        <Flex align="center" gap="3">
                                            <Text>
                                                {farm.farm_plot_progress}%
                                            </Text>
                                            <PlotProgress
                                                plotProgress={
                                                    farm.farm_plot_progress
                                                }
                                            />
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default Farms
