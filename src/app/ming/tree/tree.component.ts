import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import * as d3 from "d3";

import { MESSAGE } from "src/app/constants";
import { NameValueChildren } from "src/app/ming/ming.models";
import { DocumentTitleService } from "src/app/services/common.service";
import { FamilyService } from "../services/family.service";
import { SubMaterialModule } from "src/app/sub-material/sub-material.module";

// D3 类型声明
interface NameValueChildrenData {
	name: string;
	value?: number;
	tag?: any;
	children?: NameValueChildrenData[];
}

interface HierarchyNode {
	x: number;
	y: number;
	x0?: number;
	y0?: number;
	depth: number;
	height: number;
	id: string | number;
	data: NameValueChildrenData;
	children: HierarchyNode[] | null;
	_children: HierarchyNode[] | null;
	parent: HierarchyNode | null;
	descendants(): HierarchyNode[];
	links(): HierarchyLink[];
	eachBefore(callback: (node: HierarchyNode) => void): HierarchyNode;
}

interface HierarchyLink {
	source: HierarchyNode;
	target: HierarchyNode;
}

@Component({
	selector: "ming-tree",
	templateUrl: "./tree.component.html",
	styleUrls: ["../common.component.css"],
	imports: [CommonModule, SubMaterialModule, RouterModule],
})
export class MingTreeComponent implements OnInit {
	pageTitle = "明朝皇室成员图";

	rootNode: NameValueChildren = null;

	message = MESSAGE;
	constructor(
		private _title: DocumentTitleService,
		private _familySvc: FamilyService,
	) { }
	ngOnInit(): void {
		this._title.setTitle(this.pageTitle);
		this._familySvc
			.queryHierarchy()
			.then((data) => {
				this.rootNode = data;
				this.drawChart(data);
			})
			.catch((e) => console.error(e));
	}
	drawChart(data: NameValueChildren): void {
		// 类型断言：将 NameValueChildren 转换为 D3 可处理的格式
		const hierarchyData: NameValueChildrenData = data as any;
		// Specify the charts' dimensions. The height is variable, depending on the layout.
		const width = 1366;
		const marginTop = 32;
		const marginRight = 64;
		const marginBottom = 32;
		const marginLeft = 64;

		// Rows are separated by dx pixels, columns by dy pixels. These names can be counter-intuitive
		// (dx is a height, and dy a width). This because the tree must be viewed with the root at the
		// "bottom", in the data domain. The width of a column is based on the tree's height.
		const root: HierarchyNode = (d3 as any).hierarchy(hierarchyData);
		const dx = 24;
		const dy = (width - marginRight - marginLeft) / (1 + root.height) + 8;

		// Define the tree layout and the shape for links.
		const tree = (d3 as any).tree().nodeSize([dx, dy]);
		const diagonal = (d3 as any)
			.linkHorizontal()
			.x((d: HierarchyNode) => d.y)
			.y((d: HierarchyNode) => d.x);

		// Create the SVG container, a layer for the links and a layer for the nodes.
		const svg = (d3 as any)
			.create("svg")
			.attr("width", width)
			.attr("height", dx)
			.attr("viewBox", [-marginLeft, -marginTop, width, dx])
			.attr(
				"style",
				"max-width: 100%; height: auto; font: 14px sans-serif; user-select: none;",
			);

		const gLink = svg
			.append("g")
			.attr("fill", "none")
			.attr("stroke", "#555")
			.attr("stroke-opacity", 0.4)
			.attr("stroke-width", 1.5);

		const gNode = svg
			.append("g")
			.attr("cursor", "pointer")
			.attr("pointer-events", "all");

		function update(event: MouseEvent | null, source: HierarchyNode): void {
			const duration = event?.altKey ? 2500 : 250; // hold the alt key to slow down the transition
			const nodes = root.descendants().reverse();
			const links = root.links();

			// Compute the new tree layout.
			tree(root);

			let left = root;
			let right = root;
			root.eachBefore((node: HierarchyNode) => {
				if (node.x < left.x) left = node;
				if (node.x > right.x) right = node;
			});

			const height = right.x - left.x + marginTop + marginBottom;

			const transition = svg
				.transition()
				.duration(duration)
				.attr("height", height)
				.attr("viewBox", [-marginLeft, left.x - marginTop, width, height])
				.tween(
					"resize",
					window.ResizeObserver ? null : () => () => svg.dispatch("toggle"),
				);

			// Update the nodes…
			const node = gNode.selectAll("g").data(nodes, (d: HierarchyNode) => d.id);

			// Enter any new nodes at the parent's previous position.
			const nodeEnter = node
				.enter()
				.append("g")
				.attr("transform", () => `translate(${source.y0},${source.x0})`)
				.attr("fill-opacity", 0)
				.attr("stroke-opacity", 0)
				.on("click", (event: MouseEvent, d: HierarchyNode) => {
					d.children = d.children ? null : d._children;
					update(event, d);
				});

			nodeEnter
				.append("circle")
				.attr("r", 2.5)
				.attr("fill", (d: HierarchyNode) => (d._children ? "#555" : "#999"))
				.attr("stroke-width", 10);

			nodeEnter
				.append("text")
				.attr("dy", "0.31em")
				.attr("x", (d: HierarchyNode) => (d._children ? -8 : 8))
				.attr("text-anchor", (d: HierarchyNode) =>
					d._children ? "end" : "start",
				)
				.text((d: HierarchyNode) => d.data.name)
				.attr("stroke-linejoin", "round")
				.attr("stroke-width", 3)
				.attr("stroke", "white")
				.attr("paint-order", "stroke")
				.attr("fill", (d: HierarchyNode) =>
					d.data.tag === '皇帝' ? "red" : (d.data.tag === '南明皇帝' ? "blue" : "initial"),
				);
			// Transition nodes to their new position.
			node
				.merge(nodeEnter)
				.transition(transition)
				.attr("transform", (d: HierarchyNode) => `translate(${d.y},${d.x})`)
				.attr("fill-opacity", 1)
				.attr("stroke-opacity", 1);

			// Transition exiting nodes to the parent's new position.
			node
				.exit()
				.transition(transition)
				.remove()
				.attr("transform", () => `translate(${source.y},${source.x})`)
				.attr("fill-opacity", 0)
				.attr("stroke-opacity", 0);

			// Update the links…
			const link = gLink
				.selectAll("path")
				.data(links, (d: HierarchyLink) => d.target.id);

			// Enter any new links at the parent's previous position.
			const linkEnter = link
				.enter()
				.append("path")
				.attr("d", () => {
					const o = { x: source.x0, y: source.y0 };
					return diagonal({ source: o, target: o });
				});

			// Transition links to their new position.
			link.merge(linkEnter).transition(transition).attr("d", diagonal);

			// Transition exiting nodes to the parent's new position.
			link
				.exit()
				.transition(transition)
				.remove()
				.attr("d", () => {
					const o = { x: source.x, y: source.y };
					return diagonal({ source: o, target: o });
				});

			// Stash the old positions for transition.
			root.eachBefore((d: HierarchyNode) => {
				d.x0 = d.x;
				d.y0 = d.y;
			});
		}

		// Do the first update to the initial configuration of the tree,
		// where all nodes are open
		root.x0 = dy / 2;
		root.y0 = 0;
		root.descendants().forEach((d: HierarchyNode, i: number) => {
			d.id = i;
			d._children = d.children;
			// set `children` as null to collapse the node
			// if (d.depth) d.children = null;	
		});

		update(null, root);

		// Append SVG to the DOM with null check
		const container = document.getElementById("chart-container");
		if (container) {
			container.appendChild(svg.node());
		} else {
			console.error("Chart container element not found");
		}
	}
}
